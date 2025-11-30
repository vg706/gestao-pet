import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Parse from 'parse/react-native';


export default function employeeHomeView() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [tutors, setTutors] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);

    async function searchTutors(text) {
        setSearch(text);
        setSelectedTutor(null);
        setAnimals([]);

        if (text.length < 2) {
            setTutors([]);
            return;
        }

        try {
            const tutor = Parse.Object.extend('Tutor');
            const query = new Parse.Query(tutor);
            
            query.contains('nome', text);
            query.limit(20);

            const results = await query.find();
            setTutors(results);
        } catch (error) {
            console.log('Erro ao buscar tutores:', error);
        }
    }

    async function searchTutorAnimals(tutor) {
        setSelectedTutor(tutor);

        try {
            const animal = Parse.Object.extend('Animal');
            const query = new Parse.Query(animal);

            query.equalTo('tutor', tutor);
            const results = await query.find();

            setAnimals(results);
        } catch(error) {
            console.log('Erro ao buscar animais:', error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <SearchBar
                placeholder='Ex: Maria Silva'
                value={search}
                onChangeText={searchTutors}
                round
                lightTheme
            />
            {!selectedTutor && (
                <FlatList
                    data={tutors}
                    keyExtractor={(item => item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => searchTutorAnimals(item)}>
                            <Text>{item.get('nome')}</Text>
                            <Text>Pesquisar</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
            {selectedTutor && (
                <React.Fragment>
                    <Text>
                        Resultados para {selectedTutor.get('nome')}
                    </Text>
                    <FlatList
                        data={animals}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.get('nome')} - {item.get('raca')} - {item.get('nascimento').toLocaleDateString('pt-BR')}</Text>
                                <TouchableOpacity 
                                    onPress={() =>
                                        router.push({
                                            pathname: 'employee/register-appointment',
                                            params: { animalId: item.id }
                                        })
                                    }
                                >
                                    <Text>Registrar Consulta</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </React.Fragment>
            )}
        </View>
    );
}