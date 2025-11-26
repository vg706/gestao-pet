import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Parse from "parse/react-native.js";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { styles } from '../styles/styles';

export default function LoginView() {
    const router = useRouter();
    const [userType, setUserType] = useState("tutor");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const executeUserLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Digite email e senha.");
            return;
        }
        try {
            const loggedInUser = await Parse.User.logIn(email, password);
            const role = loggedInUser.get("role");

            if (role !== userType) {
                Alert.alert("Erro", "Usuário não encontrado.");
                return;
            }

            if (role === "tutor") {
                router.push("/tutor");
            } else if (role === "funcionario") {
                router.push("/employee");
            }
        } catch (error) {
            console.log("login falhou", error);
            Alert.alert("erro ao logar usuário", error.message);
        }
    }

  return (
      <View style={styles.container}>
          <View>
            <Text style={styles.title}>Gestão Pet</Text>
            <Text>Acompanhamento Veterinário</Text>
            <Text>Tipo de Usuário</Text>
            <View>
                <Picker
                    selectedValue={userType}
                    onValueChange={(itemValue) => setUserType(itemValue)}
                >
                    <Picker.Item label="Tutor de animal" value="tutor"/>
                    <Picker.Item label="Servidor" value="servidor"/>
                </Picker>
            </View>
            <Text>Email</Text>
            <TextInput
                placeholder='Digite seu email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />
            <Text>Senha</Text>
            <TextInput
                placeholder='Digite sua senha'
                value={password}
                onChangeText={setPassword}
                keyboardType='numbers-and-punctuation'
                secureTextEntry={true}
            />
            <TouchableOpacity onPress= {() => executeUserLogin() }>
                <Text>Entrar</Text>
            </TouchableOpacity>
            <View>
                <Text>Não tem conta?</Text>
                <Button title="Cadastre-se" onPress={() => router.navigate('/signup')}/>
            </View>
          </View>
      </View>
  )
}