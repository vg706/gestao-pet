import { View, Text, TextInput, Button, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Parse from 'parse/react-native.js';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

export default function AnimalRegisterView() {
    const router = useRouter();
    const [animalName, setAnimalName] = useState('');
    const [animalEspecies, setAnimalSpecies] = useState('Cachorro');
    const [animalBreed, setAnimalBreed] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [animalObservations, setAnimalObservations] = useState('');
    const [openCalendar, setOpenCalendar] = useState(false);
    const [textInputHeight, setTextInputHeight] = useState(40);


    const getCurrentUser = async function () {
        const currentUser = Parse.User.currentAsync();
        return currentUser
    }

    const registerAnimal = async () => {
        try {
            const newAnimal = new Parse.Object("Animal");
            const user = await getCurrentUser();

            const currentTutor = Parse.Object.extend('Tutor');
            const tutorQuery = new Parse.Query(currentTutor);
            tutorQuery.equalTo("usuario", user);

            const animalTutor = await tutorQuery.first();

            if (!animalTutor) {
                Alert.alert("Erro", "Tutor não encontrado para este usuário.");
                return;
            }

            newAnimal.set("nome", animalName);
            newAnimal.set("especie", animalEspecies);
            newAnimal.set("raca", animalBreed);
            newAnimal.set("nascimento", birthDate);
            newAnimal.set("tutor", animalTutor);
            await newAnimal.save();
            router.replace('/tutor');
        } catch (error) {
            console.log("FULL SERVER ERROR:", JSON.stringify(error, null, 2));
            console.log("RAW ERROR:", error);
            Alert.alert("Erro ao salvar detalhes do usuário", error.message);
        }
    }

    return (
        <View>
            <Text>Cadastrar novo animal</Text>
            <Text>Preencha os dados do seu pet</Text>
            <Text>Nome do animal</Text>
            <TextInput
                placeholder='Ex: Rex, Luna'
                value={animalName}
                onChangeText={setAnimalName}
            />
            <Text>Espécie</Text>
            <View>
                <Picker
                    selectedValue={animalEspecies}
                    onValueChange={(speciesValue) => setAnimalSpecies(speciesValue)}
                >
                    <Picker.Item label="Cachorro" value="Cachorro"/>
                    <Picker.Item label="Gato" value="Gato"/>
                </Picker>
            </View>
            <Text>Raça</Text>
            <TextInput
                placeholder='Ex: Labrador, Siamesa, SRD'
                value={animalBreed}
                onChangeText={setAnimalBreed}
            />
            <Text>Data de nascimento (aproximada)</Text>
            {Platform.OS === 'web' ? (
                <input
                    type="date"
                    onChange={(e) => {
                        const [year, month, day] = e.target.value.split("-");
                        const fixedDate = new Date(year, month - 1, day);
                        setBirthDate(fixedDate);
                    }}
                />
            ) : (
                <DatePicker
                    modal
                    open={openCalendar}
                    date={birthDate}
                    mode="date"
                    onConfirm={(date) => {
                        setOpenCalendar(false);
                        const correctedDate = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                        );
                        setBirthDate(correctedDate);
                    }}
                    onCancel={() => setOpenCalendar(false)}
                />
            )}
            <Text>Observações</Text>
            <TextInput
                value={animalObservations}
                onChangeText={setAnimalObservations}
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
                placeholder="Alergias, condições especiais..."
            />
            <View>
                <Button title="Cancelar" onPress={() => router.replace('/tutor')}/>
                <Button title="Salvar animal" onPress={() => registerAnimal() }/>
            </View>
        </View>
    )
}