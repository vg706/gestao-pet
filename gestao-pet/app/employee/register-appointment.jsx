import { View, Text, Button, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Parse from 'parse/react-native';

export default function RegisterAppointmentView() {
    const router = useRouter();
    const { animalId } = useLocalSearchParams();
    const [animal, setAnimal] = useState(null);
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [appointmentProcedures, setAppointmentProcedures] = useState('');
    const [appointmentObservations, setAppointmentObservations] = useState('');
    const [textInputHeight, setTextInputHeight] = useState(40);

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
        return <Text>...</Text>;
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

            await animal.save(); // ✅ salva o vínculo

            router.back();

        } catch (error) {
            console.log('Erro ao salvar atendimento:', error);
        }
    }
    return (
        <View>
            <Text>Registrar Consulta</Text>
            <Text>Preencha os dados da consulta realizada</Text>
            <Text>Animal: {animal.get('nome')}</Text>
            <Text>Procedimentos realizados</Text>
            <TextInput
                value={appointmentProcedures}
                onChangeText={setAppointmentProcedures}
                multiline
                onContentSizeChange={(e) => {
                    const newHeight = e.nativeEvent.contentSize.height;
                    setTextInputHeight(Math.min(120, Math.max(40, newHeight)));
                }}
                style={{
                    minHeight: 40,
                    maxHeight: 120,
                    height: textInputHeight,
                    borderWidth: 1,
                    padding: 10
                }}
                placeholder="Descreva os procedimentos realizados..."
            />
            <Text>Vacinas Aplicadas</Text>
            <Picker
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
            <TextInput
                value={appointmentObservations}
                onChangeText={setAppointmentObservations}
                multiline
                onContentSizeChange={(e) => {
                    const newHeight = e.nativeEvent.contentSize.height;
                    setTextInputHeight(Math.min(120, Math.max(40, newHeight)));
                }}
                style={{
                    minHeight: 40,
                    maxHeight: 120,
                    height: textInputHeight,
                    borderWidth: 1,
                    padding: 10
                }}
                placeholder="Observações adicionais..."
            />
            <Button title="Salvar registro de consulta" onPress={() => saveAppointment(animal)} />
        </View>
    )
}