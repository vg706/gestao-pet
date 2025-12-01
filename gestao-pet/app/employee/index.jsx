// app/employee/index.jsx
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Parse from 'parse/react-native';
import { styles } from '../../styles/styles';

export default function EmployeeHomeView() {
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
        <View style={styles.employeeContainer}>
            <View style={styles.searchContainer}>
                <SearchBar
                    placeholder='Buscar tutor... Ex: Maria Silva'
                    value={search}
                    onChangeText={searchTutors}
                    round
                    lightTheme
                    containerStyle={{ backgroundColor: 'transparent' }}
                    inputContainerStyle={{ backgroundColor: '#f0f0f0' }}
                />
            </View>
            
            {!selectedTutor && (
                <FlatList
                    data={tutors}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.tutorItem}
                            onPress={() => searchTutorAnimals(item)}
                        >
                            <Text style={styles.tutorName}>{item.get('nome')}</Text>
                            <Text style={styles.searchButton}>Ver animais</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyState}>
                            {search.length >= 2 ? 'Nenhum tutor encontrado' : 'Digite pelo menos 2 caracteres para buscar'}
                        </Text>
                    }
                />
            )}
            
            {selectedTutor && (
                <React.Fragment>
                    <Text style={styles.resultsHeader}>
                        Animais de {selectedTutor.get('nome')}
                    </Text>
                    <FlatList
                        data={animals}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.animalItem}>
                                <Text style={styles.animalName}>{item.get('nome')}</Text>
                                <Text style={styles.animalDetails}>
                                    {item.get('raca')} • {item.get('nascimento').toLocaleDateString('pt-BR')}
                                </Text>
                                <TouchableOpacity 
                                    style={styles.registerButton}
                                    onPress={() =>
                                        router.push({
                                            pathname: 'employee/register-appointment',
                                            params: { animalId: item.id }
                                        })
                                    }
                                >
                                    <Text style={styles.registerButtonText}>Registrar Consulta</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyState}>Nenhum animal encontrado para este tutor</Text>
                        }
                    />
                </React.Fragment>
            )}
        </View>
    );
}