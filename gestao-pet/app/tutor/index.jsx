import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Stack, useRouter, useFocusEffect } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCallback, useState } from 'react';
import Parse from "parse/react-native";

export default function tutorHomeView() {
    const router = useRouter();
    const [animals, setAnimals] = useState([]);

    async function loadAnimals() {
        const Animal = Parse.Object.extend("Animal");
        const query = new Parse.Query(Animal);
        const result = await query.find();
        setAnimals(result);
    }


    useFocusEffect(
        useCallback(() => {
        loadAnimals();
        }, [])
    );

    return (
        <View>
            <Stack.Screen options={{title:'gestão-pet'}}/>
            <Text>Meus Pets</Text>
            <Text>Acompanhe a saúde dos seus animais</Text>
            <View>
                <FlatList
                    data={animals}
                    keyExtractor={(animal => animal.id)}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/tutor/animal-details",
                                params: { id: item.id }
                            })
                        }
                    >
                        <Text>🐾 {item.get("nome")}</Text>
                        <Text>Espécie: {item.get("especie")}</Text>
                        <Text>Raça: {item.get("raca")}</Text>
                        <Text>
                            Idade: {
                                item.get("nascimento").toLocaleDateString("pt-BR")
                            }
                        </Text>
                    </TouchableOpacity>
                    )}
                />
                <TouchableOpacity onPress={() => router.push('/tutor/register-animal')}>
                    <AntDesign name='plus' size={15} color='black'/>
                    <Text>Adicionar novo pet</Text>
                    <Text>Cadastre um novo animal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
