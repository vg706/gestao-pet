import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Parse from 'parse/react-native.js';
import { styles } from '../../styles/styles';

export default function EmployeeHomeView() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [tutors, setTutors] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);

    // Função para buscar tutores pelo seu nome
    async function searchTutors(text) {
        setSearch(text);
        setSelectedTutor(null);
        setAnimals([]);

        // Começa a mostrar quando digita a primeira letra na caixa de texto
        if (text.length < 1) {
            setTutors([]);
            return;
        }

        try {
            const tutor = Parse.Object.extend('Tutor');
            const query = new Parse.Query(tutor);
            
            // busca pelos tutores que seu nome combine com o que está escrito
            query.matches('nome', new RegExp(text, 'i'));
            query.limit(20);

            const results = await query.find();
            setTutors(results);
        } catch (error) {
            console.log('Erro ao buscar tutores:', error);
        }
    }

    // Função para mostrar os animais do tutor escolhido
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
                    placeholder='Ex: Maria Silva'
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
                            {search.length >= 2 ? 'Nenhum tutor encontrado' : 'Busque os tutores pelo nome'}
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