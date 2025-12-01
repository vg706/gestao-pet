// app/tutor/animal-details.jsx
import { View, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from '../../styles/styles';

export default function AnimalDetailsView() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Dados mock para demonstração - substitua pelos dados reais do Parse
    const animalData = {
        id: params.animalId || '1',
        nome: 'Rex',
        raca: 'Labrador Retriever',
        nascimento: new Date('2020-05-15'),
        peso: '28 kg',
        sexo: 'Macho'
    };

    // Dados mock das consultas - substitua pelos dados reais do Parse
    const appointments = [
        {
            id: '1',
            data: new Date('2024-01-15'),
            vacina: 'Vacina V8',
            relatorio: 'Animal em bom estado de saúde. Aplicada vacina V8. Peso estável.',
            funcionario: 'Dr. João Silva'
        },
        {
            id: '2',
            data: new Date('2024-03-20'),
            vacina: 'Vacina Antirrábica',
            relatorio: 'Consulta de rotina. Animal apresentou comportamento normal. Aplicada vacina antirrábica.',
            funcionario: 'Dra. Maria Santos'
        },
        {
            id: '3',
            data: new Date('2024-06-10'),
            vacina: 'Vermífugo',
            relatorio: 'Controle de parasitas. Administrado vermífugo. Orientado sobre cuidados com alimentação.',
            funcionario: 'Dr. João Silva'
        }
    ];

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

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
        <ScrollView style={styles.animalDetailsContainer}>
            {/* Cabeçalho com informações do animal */}
            <View style={styles.animalHeader}>
                <Text style={styles.animalTitle}>{animalData.nome}</Text>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Raça:</Text>
                    <Text style={styles.animalInfoValue}>{animalData.raca}</Text>
                </View>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Idade:</Text>
                    <Text style={styles.animalInfoValue}>
                        {calculateAge(animalData.nascimento)} anos
                    </Text>
                </View>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Nascimento:</Text>
                    <Text style={styles.animalInfoValue}>
                        {formatDate(animalData.nascimento)}
                    </Text>
                </View>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Peso:</Text>
                    <Text style={styles.animalInfoValue}>{animalData.peso}</Text>
                </View>
                
                <View style={styles.animalInfoRow}>
                    <Text style={styles.animalInfoLabel}>Sexo:</Text>
                    <Text style={styles.animalInfoValue}>{animalData.sexo}</Text>
                </View>
            </View>

            {/* Histórico de Consultas */}
            <Text style={styles.sectionTitle}>Histórico de Consultas</Text>

            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <View key={appointment.id} style={styles.appointmentCard}>
                        <Text style={styles.appointmentDate}>
                            {formatDate(appointment.data)}
                        </Text>
                        
                        <Text style={styles.appointmentVaccine}>
                            {appointment.vacina}
                        </Text>
                        
                        <Text style={styles.appointmentReport}>
                            {appointment.relatorio}
                        </Text>
                        
                        <Text style={styles.employeeInfo}>
                            Atendido por: {appointment.funcionario}
                        </Text>
                    </View>
                ))
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