import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import Parse from 'parse/react-native.js';
import { styles } from '../../styles/styles';

export default function AnimalDetailsView() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [animal, setAnimal] = useState(null);
    const [appointments, setAppointments] = useState([]);

    // Função para carregar os dados do animal
    const loadAnimal = async () => {
        try {
            const Animal = Parse.Object.extend("Animal");
            const query = new Parse.Query(Animal);
            const result = await query.get(params.animalId);
            setAnimal(result);
        } catch (error) {
            console.log("Erro ao carregar animal:", error);
        }
    };

    // Função para deletar o animal
    const deleteAnimal = async () => {
        if (!animal) return;

        Alert.alert(
            "Confirmação",
            `Deseja realmente excluir ${animal.get("nome")}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await animal.destroy();
                            Alert.alert("Sucesso", "Animal excluído com sucesso!");
                            router.replace("/tutor");
                        } catch (error) {
                            console.log("Erro ao excluir animal:", error);
                            Alert.alert("Erro", "Não foi possível excluir o animal.");
                        }
                    },
                },
            ]
        );
    };

    // Função para carregar os atendimentos do animal
    const loadAppointments = async () => {
        try {
            const Atendimento = Parse.Object.extend("Atendimento");
            const query = new Parse.Query(Atendimento);
            query.equalTo("animal", {
                __type: "Pointer",
                className: "Animal",
                objectId: params.animalId
            });
            query.include("funcionario"); // inclui apenas o funcionário
            query.ascending("data");
            const results = await query.find();

            // Para cada atendimento, busca as vacinas aplicadas
            const appointmentsWithVaccines = await Promise.all(
                results.map(async (appointment) => {
                    const vacinas = await appointment.relation("vacinas").query().find();
                    return { appointment, vacinas };
                })
            );

            setAppointments(appointmentsWithVaccines);
        } catch (error) {
            console.log("Erro ao carregar atendimentos:", error);
        }
    };

    // Carrega animal e atendimentos quando tá montando o componente
    useEffect(() => {
        if (params.animalId) {
            loadAnimal();
            loadAppointments();
        }
    }, [params.animalId]);

    // Formatação da data para o padrão br
    const formatDate = (date) => {
        if (!date) return "-";
    
        let parsedDate = date;
    
        // If it's a string, convert to Date
        if (typeof date === "string") {
            parsedDate = new Date(date);
        }
    
        // If it's not a valid Date
        if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
            return "-";
        }
    
        return parsedDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Calcula idade a partir da data de nascimento registrada pelo tutor
    const calculateAge = (birthDate) => {
        if (!birthDate) return "";
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (!animal) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.loadingText}>Carregando informações do animal...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.animalDetailsContainer}>
            {/* Botão de deletar animal (no header) */}
            <Stack.Screen
                options={{
                    title: animal.get("nome"),
                    headerRight: () => (
                        <Text
                            style={{ color: '#e74c3c', marginRight: 16, fontWeight: 'bold' }}
                            onPress={deleteAnimal}
                        >
                            Excluir
                        </Text>
                    ),
                }}
            />

            {/* Informações do Animal */}
            <View style={styles.animalHeader}>
                <Text style={styles.animalTitle}>{animal.get("nome")}</Text>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Raça:</Text>
                    <Text style={styles.animalInfoValue}>{animal.get("raca") || "-"}</Text>
                </View>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Idade:</Text>
                    <Text style={styles.animalInfoValue}>
                        {calculateAge(animal.get("nascimento"))} anos
                    </Text>
                </View>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Nascimento:</Text>
                    <Text style={styles.animalInfoValue}>
                        {formatDate(animal.get("nascimento"))}
                    </Text>
                </View>

                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Observações:</Text>
                    <Text style={styles.animalInfoValue}>
                        {animal.get("observacoes") || "-"}
                    </Text>
                </View>
            </View>

            {/* Histórico de Consultas */}
            <Text style={styles.sectionTitle}>Histórico de Consultas</Text>

            {appointments.length > 0 ? (
                appointments.map(({ appointment, vacinas }) => {
                    const vacinaNames = vacinas.map(v => v.get("nome")).join(", ") || "Sem vacina";
                    const funcionarioName = appointment.get("funcionario")?.get("nome") || "Desconhecido";

                    return (
                        <View key={appointment.id} style={styles.appointmentCard}>
                            <Text style={styles.appointmentDate}>
                                {formatDate(appointment.get("data"))}
                            </Text>
                            
                            <Text style={styles.appointmentVaccine}>
                                {vacinaNames}
                            </Text>

                            <Text style={styles.appointmentReport}>
                                Procedimentos: {appointment.get("procedimentos")}
                            </Text>
                            
                            <Text style={styles.appointmentReport}>
                                Observações: {appointment.get("relatorio")}
                            </Text>

                            <Text style={styles.employeeInfo}>
                                Atendido por: {funcionarioName}
                            </Text>
                        </View>
                    );
                })
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Nenhuma consulta registrada</Text>
                    <Text style={styles.emptyStateSubtext}>
                        As consultas aparecerão aqui quando forem agendadas
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}
