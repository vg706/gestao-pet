// app/employee/register-appointment.jsx
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Parse from 'parse/react-native';
import { styles } from '../../styles/styles';

export default function RegisterAppointmentView() {
    const router = useRouter();
    const { animalId } = useLocalSearchParams();
    const [animal, setAnimal] = useState(null);
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [appointmentProcedures, setAppointmentProcedures] = useState('');
    const [appointmentObservations, setAppointmentObservations] = useState('');
    const [proceduresHeight, setProceduresHeight] = useState(40);
    const [observationsHeight, setObservationsHeight] = useState(40);

    useEffect(() => {
        fetchVaccines();
    }, []);

    async function fetchVaccines() {
        try {
            const Vaccine = Parse.Object.extend("Vacina");
            const query = new Parse.Query(Vaccine);
            const results = await query.find();

            const formattedVaccines = results.map(v => ({
                id: v.id,
                name: v.get("nome"), 
            }));

            setVaccines(formattedVaccines);
        } catch (error) {
            console.error("Erro ao carregar vacinas:", error);
        }
    }

    useEffect(() => {
        async function fetchAnimal() {
            try {
                const animal = Parse.Object.extend('Animal');
                const query = new Parse.Query(animal);
                const result = await query.get(animalId);
                setAnimal(result);
            } catch (error) {
                console.log('Erro ao buscar animal:', error);
            }
        }

        if (animalId) {
            fetchAnimal();
        }
    }, [animalId]);

    if (!animal) {
        return <Text style={styles.loadingText}>Carregando...</Text>;
    }

    async function saveAppointment(animal) {
        try {
            if (!selectedVaccine) {
                Alert.alert("Erro", "Selecione uma vacina");
                return;
            }

            const Appointment = Parse.Object.extend('Atendimento');
            const newAppointment = new Appointment();

            const user = await Parse.User.currentAsync();

            const Funcionario = Parse.Object.extend('Funcionario');
            const queryFuncionario = new Parse.Query(Funcionario);
            queryFuncionario.equalTo("usuario", user);

            let employee = await queryFuncionario.first();

            const Vacina = Parse.Object.extend('Vacina');
            const vaccinePointer = new Vacina();
            vaccinePointer.id = selectedVaccine;

            newAppointment.set('animal', animal);
            newAppointment.set('funcionario', employee);
            newAppointment.set('vacinas', vaccinePointer);
            newAppointment.set('relatorio', appointmentObservations);
            newAppointment.set('data', new Date());

            await newAppointment.save();

            const relation = animal.relation("atendimentos");
            relation.add(newAppointment);

            await animal.save();

            Alert.alert("Sucesso", "Consulta registrada com sucesso!");
            router.back();

        } catch (error) {
            console.log('Erro ao salvar atendimento:', error);
            Alert.alert("Erro", "Não foi possível salvar a consulta");
        }
    }

    return (
        <View style={styles.registerAppointmentContainer}>
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
                    onContentSizeChange={(e) => {
                        const newHeight = e.nativeEvent.contentSize.height;
                        setProceduresHeight(Math.min(120, Math.max(40, newHeight)));
                    }}
                    style={[
                        styles.textInputMultiline,
                        { height: proceduresHeight }
                    ]}
                    placeholder="Descreva os procedimentos realizados..."
                />

                {/* Vacinas */}
                <View style={styles.vaccineSection}>
                    <Text style={styles.textLabel}>Vacinas Aplicadas</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedVaccine}
                            onValueChange={(vaccineId) => setSelectedVaccine(vaccineId)}
                        >
                            <Picker.Item label="Selecione uma vacina" value={null} />
                            {vaccines.map((vaccine) => (
                                <Picker.Item
                                    key={vaccine.id}
                                    label={vaccine.name}
                                    value={vaccine.id}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Observações */}
                <Text style={styles.textLabel}>Observações adicionais</Text>
                <TextInput
                    value={appointmentObservations}
                    onChangeText={setAppointmentObservations}
                    multiline
                    onContentSizeChange={(e) => {
                        const newHeight = e.nativeEvent.contentSize.height;
                        setObservationsHeight(Math.min(120, Math.max(40, newHeight)));
                    }}
                    style={[
                        styles.textInputMultiline,
                        { height: observationsHeight }
                    ]}
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
        </View>
    );
}