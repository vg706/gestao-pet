import 'react-native-get-random-values';
import * as Crypto from 'expo-crypto';
import { Stack } from "expo-router";
import { setParseConfig } from '../parse-config';
import { styles } from '../styles/styles';

setParseConfig();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // Estilização global do header para todas as telas
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: styles.headerTintColor.color,
        headerBackTitle: "Voltar",
        contentStyle: { backgroundColor: '#f5f5f5' }, // Cor de fundo de todas as telas
      }}
    >
      {/* Tela de Login */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Gestão Pet',
          headerShown: true,
        }}
      />
      
      {/* Tela de Cadastro */}
      <Stack.Screen
        name="signup"
        options={{
          title: 'Cadastro',
          headerShown: true,
        }}
      />
      
      {/* Telas do Tutor */}
      <Stack.Screen
        name="tutor/index"
        options={{
          title: 'Meus Pets',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="tutor/animal-details"
        options={{
          title: 'Detalhes do Animal',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="tutor/register-animal"
        options={{
          title: 'Cadastrar Animal',
          headerShown: true,
        }}
      />
      
      {/* Telas do Funcionário */}
      <Stack.Screen
        name="employee/index"
        options={{
          title: 'Buscar Tutores',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="employee/register-appointment"
        options={{
          title: 'Registrar Consulta',
          headerShown: true,
        }}
      />
    </Stack>
  );
}