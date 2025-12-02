import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Parse from 'parse/react-native.js';
import { styles } from '../../styles/styles';

export default function RegisterAppointmentView() {
    const router = useRouter();
    const { animalId } = useLocalSearchParams();
    const [animal, setAnimal] = useState(null);
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [appointmentProcedures, setAppointmentProcedures] = useState('');
    const [appointmentObservations, setAppointmentObservations] = useState('');
    const [proceduresHeight, setProceduresHeight] = useState(40);
    const [observationsHeight, setObservationsHeight] = useState(40);

    // Busca todas as vacinas ao carregar a tela
    useEffect(() => {
        fetchVaccines();
    }, []);

    async function fetchVaccines() {
        try {
            const Vaccine = Parse.Object.extend("Vacina");
            const query = new Parse.Query(Vaccine);
            const results = await query.find();

            // Formata os dados das vacinas para exibição
            const formattedVaccines = results.map(v => ({
                id: v.id,
                name: v.get("nome"),
            }));

            setVaccines(formattedVaccines);
        } catch (error) {
            console.error("Erro ao carregar vacinas:", error);
        }
    }

    // Busca os dados do animal atual
    useEffect(() => {
        async function fetchAnimal() {
            try {
                const Animal = Parse.Object.extend('Animal');
                const query = new Parse.Query(Animal);
                const result = await query.get(animalId);
                setAnimal(result);
            } catch (error) {
                console.log('Erro ao buscar animal:', error);
            }
        }

        if (animalId) fetchAnimal();
    }, [animalId]);

    // Mostra um texto de carregamento se o animal ainda não foi buscado
    if (!animal) {
        return <Text style={styles.loadingText}>Carregando...</Text>;
    }

    // Função para selecionar/deselecionar vacinas
    const toggleVaccine = (vaccineId) => {
        if (selectedVaccines.includes(vaccineId)) {
            setSelectedVaccines(selectedVaccines.filter(id => id !== vaccineId));
        } else {
            setSelectedVaccines([...selectedVaccines, vaccineId]);
        }
    };

    // Função para salvar o atendimento no Parse
    async function saveAppointment(animal) {
        try {
            if (selectedVaccines.length === 0) {
                Alert.alert("Erro", "Selecione pelo menos uma vacina");
                return;
            }

            const Appointment = Parse.Object.extend('Atendimento');
            const newAppointment = new Appointment();

            // Pega o funcionário logado
            const user = await Parse.User.currentAsync();
            const Funcionario = Parse.Object.extend('Funcionario');
            const queryFuncionario = new Parse.Query(Funcionario);
            queryFuncionario.equalTo("usuario", user);
            const employee = await queryFuncionario.first();

            // Define os dados do atendimento
            newAppointment.set('animal', animal);
            newAppointment.set('funcionario', employee);
            newAppointment.set('relatorio', appointmentObservations);
            newAppointment.set('data', new Date());
            newAppointment.set('procedimentos', appointmentProcedures);

            // Adiciona as vacinas na Relation
            const vacinasRelation = newAppointment.relation("vacinas");
            selectedVaccines.forEach(vacId => {
                const Vacina = Parse.Object.extend("Vacina");
                const vacinaPointer = new Vacina();
                vacinaPointer.id = vacId;
                vacinasRelation.add(vacinaPointer);
            });

            await newAppointment.save();

            // Adiciona atendimento na relação do animal
            const animalRelation = animal.relation("atendimentos");
            animalRelation.add(newAppointment);
            await animal.save();

            Alert.alert("Sucesso", "Consulta registrada com sucesso!");
            router.back();

        } catch (error) {
            console.log('Erro ao salvar atendimento:', error);
            Alert.alert("Erro", "Não foi possível salvar a consulta");
        }
    }

    return (
        <ScrollView style={styles.registerAppointmentContainer} contentContainerStyle={{ paddingBottom: 30 }}>
            {/* Cabeçalho */}
            <View style={styles.animalInfo}>
                <Text style={styles.animalName}>Animal: {animal.get('nome')}</Text>
                <Text style={styles.textSubtitle}>Preencha os dados da consulta realizada</Text>
            </View>

            {/* Formulário */}
            <View style={styles.formContainer}>
                <Text style={styles.textTitle}>Registrar Consulta</Text>
                
                {/* Procedimentos */}
                <Text style={styles.textLabel}>Procedimentos realizados</Text>
                <TextInput
                    value={appointmentProcedures}
                    onChangeText={setAppointmentProcedures}
                    multiline
                    onContentSizeChange={(e) => setProceduresHeight(Math.min(120, Math.max(40, e.nativeEvent.contentSize.height)))}
                    style={[styles.textInputMultiline, { height: proceduresHeight }]}
                    placeholder="Descreva os procedimentos realizados..."
                />

                {/* Vacinas */}
                <View style={styles.vaccineSection}>
                    <Text style={styles.textLabel}>Vacinas Aplicadas</Text>
                    {vaccines.map(vaccine => (
                        <TouchableOpacity
                            key={vaccine.id}
                            onPress={() => toggleVaccine(vaccine.id)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 4
                            }}
                        >
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderWidth: 1,
                                    borderColor: '#3498db',
                                    borderRadius: 4,
                                    marginRight: 8,
                                    backgroundColor: selectedVaccines.includes(vaccine.id) ? '#3498db' : '#fff'
                                }}
                            />
                            <Text style={{ color: '#2c3e50', fontSize: 16 }}>{vaccine.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Observações */}
                <Text style={styles.textLabel}>Observações adicionais</Text>
                <TextInput
                    value={appointmentObservations}
                    onChangeText={setAppointmentObservations}
                    multiline
                    onContentSizeChange={(e) => setObservationsHeight(Math.min(120, Math.max(40, e.nativeEvent.contentSize.height)))}
                    style={[styles.textInputMultiline, { height: observationsHeight }]}
                    placeholder="Observações adicionais..."
                />

                {/* Botão Salvar */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => saveAppointment(animal)}
                >
                    <Text style={styles.buttonText}>Salvar registro de consulta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
