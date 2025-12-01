// app/tutor/register-animal.jsx
import { View, Text, TextInput, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Parse from 'parse/react-native.js';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { styles } from '../../styles/styles';

export default function AnimalRegisterView() {
    const router = useRouter();
    const [animalName, setAnimalName] = useState('');
    const [animalEspecies, setAnimalSpecies] = useState('Cachorro');
    const [animalBreed, setAnimalBreed] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [animalObservations, setAnimalObservations] = useState('');
    const [openCalendar, setOpenCalendar] = useState(false);
    const [observationsHeight, setObservationsHeight] = useState(40);

    const getCurrentUser = async function () {
        const currentUser = await Parse.User.currentAsync();
        return currentUser;
    }

    const registerAnimal = async () => {
        try {
            if (!animalName.trim()) {
                Alert.alert("Erro", "Por favor, informe o nome do animal.");
                return;
            }

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

            newAnimal.set("nome", animalName.trim());
            newAnimal.set("especie", animalEspecies);
            newAnimal.set("raca", animalBreed.trim());
            newAnimal.set("nascimento", birthDate);
            newAnimal.set("observacoes", animalObservations.trim());
            newAnimal.set("tutor", animalTutor);
            
            await newAnimal.save();
            Alert.alert("Sucesso", "Animal cadastrado com sucesso!");
            router.replace('/tutor');
        } catch (error) {
            console.log("Erro ao cadastrar animal:", error);
            Alert.alert("Erro", "Não foi possível cadastrar o animal. Tente novamente.");
        }
    }

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <ScrollView style={styles.registerAnimalContainer}>
            {/* Cabeçalho */}
            <View style={styles.registerAnimalHeader}>
                <Text style={styles.registerAnimalTitle}>Cadastrar novo animal</Text>
                <Text style={styles.textSubtitle}>Preencha os dados do seu pet</Text>
            </View>

            {/* Formulário */}
            <View style={styles.registerAnimalForm}>
                {/* Nome do Animal */}
                <View style={styles.formSection}>
                    <Text style={styles.textLabel}>
                        Nome do animal <Text style={styles.requiredField}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ex: Rex, Luna'
                        value={animalName}
                        onChangeText={setAnimalName}
                    />
                </View>

                {/* Espécie */}
                <View style={styles.formSection}>
                    <Text style={styles.textLabel}>Espécie</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={animalEspecies}
                            onValueChange={(speciesValue) => setAnimalSpecies(speciesValue)}
                        >
                            <Picker.Item label="Cachorro" value="Cachorro"/>
                            <Picker.Item label="Gato" value="Gato"/>
                        </Picker>
                    </View>
                </View>

                {/* Raça */}
                <View style={styles.formSection}>
                    <Text style={styles.textLabel}>Raça</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ex: Labrador, Siamesa, SRD'
                        value={animalBreed}
                        onChangeText={setAnimalBreed}
                    />
                </View>

                {/* Data de Nascimento */}
                <View style={styles.formSection}>
                    <Text style={styles.textLabel}>Data de nascimento (aproximada)</Text>
                    {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            style={styles.webDateInput}
                            onChange={(e) => {
                                const [year, month, day] = e.target.value.split("-");
                                const fixedDate = new Date(year, month - 1, day);
                                setBirthDate(fixedDate);
                            }}
                        />
                    ) : (
                        <>
                            <TouchableOpacity 
                                style={styles.datePickerButton}
                                onPress={() => setOpenCalendar(true)}
                            >
                                <Text style={[
                                    styles.datePickerText,
                                    !birthDate && styles.datePlaceholder
                                ]}>
                                    {birthDate ? formatDate(birthDate) : 'Selecione uma data'}
                                </Text>
                            </TouchableOpacity>
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
                        </>
                    )}
                </View>

                {/* Observações */}
                <View style={styles.formSection}>
                    <Text style={styles.textLabel}>Observações</Text>
                    <TextInput
                        value={animalObservations}
                        onChangeText={setAnimalObservations}
                        multiline
                        onContentSizeChange={(e) => {
                            const newHeight = e.nativeEvent.contentSize.height;
                            setObservationsHeight(Math.min(120, Math.max(40, newHeight)));
                        }}
                        style={[
                            styles.textInputMultiline,
                            { height: observationsHeight }
                        ]}
                        placeholder="Alergias, condições especiais, comportamentos..."
                    />
                </View>

                {/* Botões */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => router.replace('/tutor')}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.saveAnimalButton}
                        onPress={registerAnimal}
                    >
                        <Text style={styles.buttonText}>Salvar animal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}