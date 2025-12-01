import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Stack, useRouter, useFocusEffect } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCallback, useState } from 'react';
import Parse from "parse/react-native.js";
import { styles } from '../../styles/styles';

export default function TutorHomeView() {
    const router = useRouter();
    const [animals, setAnimals] = useState([]);

    async function loadAnimals() {
        try {
            // Pega o usuário que está logado agora
          const currentUser = await Parse.User.currentAsync(); 
          if (!currentUser) return;
      
          // Pega o tutor ligado ao usuário criado
          const Tutor = Parse.Object.extend("Tutor");
          const tutorQuery = new Parse.Query(Tutor);
          tutorQuery.equalTo("usuario", currentUser);
          const tutor = await tutorQuery.first();
      
          if (!tutor) {
            setAnimals([]);
            return;
          }
      
          // Pega os animais ligados ao tutor
          const Animal = Parse.Object.extend("Animal");
          const animalQuery = new Parse.Query(Animal);
          animalQuery.equalTo("tutor", tutor);
          const result = await animalQuery.find();
          setAnimals(result);
        } catch (error) {
          console.log('Erro ao carregar animais:', error);
        }
    }
      

    useFocusEffect(
        useCallback(() => {
            loadAnimals();
        }, [])
    );

    // Calcular idade do animal baseado no seu nascimento
    const calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <View style={styles.tutorHomeContainer}>
            <Stack.Screen options={{ title: 'Gestão Pet' }} />
            
            {/* Cabeçalho */}
            <View style={styles.tutorHeader}>
                <Text style={styles.tutorMainTitle}>Meus Pets</Text>
                <Text style={styles.tutorSubtitle}>
                    Acompanhe a saúde e o histórico veterinário dos seus animais
                </Text>
            </View>

            {/* Lista de Animais */}
            <View style={styles.petsList}>
                {animals.length > 0 ? (
                    <FlatList
                        data={animals}
                        keyExtractor={(animal) => animal.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.animalCard}
                                onPress={() =>
                                    router.push({
                                        pathname: "/tutor/animal-details",
                                        params: { animalId: item.id }
                                    })
                                }
                            >
                                <View style={styles.animalCardHeader}>
                                    <Text style={styles.animalIcon}>🐾</Text>
                                    <Text style={styles.animalCardName}>{item.get("nome")}</Text>
                                </View>
                                
                                <Text style={styles.animalCardDetail}>
                                    <Text style={{ fontWeight: '600' }}>Espécie:</Text> {item.get("especie")}
                                </Text>
                                
                                <Text style={styles.animalCardDetail}>
                                    <Text style={{ fontWeight: '600' }}>Raça:</Text> {item.get("raca")}
                                </Text>
                                
                                <Text style={styles.animalCardDetail}>
                                    <Text style={{ fontWeight: '600' }}>Idade:</Text> {calculateAge(item.get("nascimento"))} anos
                                </Text>
                                
                                <Text style={styles.animalCardDetail}>
                                    <Text style={{ fontWeight: '600' }}>Nascimento:</Text> {item.get("nascimento").toLocaleDateString("pt-BR")}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.emptyPetsState}>
                        <Text style={styles.emptyPetsText}>Nenhum pet cadastrado</Text>
                        <Text style={styles.emptyStateSubtext}>
                            Adicione seu primeiro pet para começar
                        </Text>
                    </View>
                )}
            </View>

            {/* Botão Adicionar Pet */}
            <TouchableOpacity 
                style={styles.addPetButton}
                onPress={() => router.push('/tutor/register-animal')}
            >
                <View style={styles.addPetButtonContent}>
                    <AntDesign 
                        name='plus' 
                        size={20} 
                        color='#3498db'
                        style={styles.addPetIcon}
                    />
                    <Text style={styles.addPetText}>Adicionar novo pet</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}