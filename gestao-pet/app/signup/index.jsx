import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import Parse from 'parse/react-native.js';
import { styles } from '../../styles/styles';

const signupView = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("tutor");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const executeSignup = async () => {
        try {
            if (!username || !email || !password) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
            }

            await Parse.User.logOut();

            const user = new Parse.User();

            user.set("username", email);
            user.set("email", email);
            user.set("password", password);
            user.set("role", userType);

            const createdUser = await user.signUp();

            await saveUserToType(createdUser);
            Alert.alert("Conta criada!", "Usuário registrado com sucesso.");
            router.replace("/");
        } catch (error) {
            console.log("RAW ERROR:", error);
            console.log("ERROR KEYS:", Object.keys(error || {}));
            Alert.alert("Erro no cadastro", String(error));
        }
    };
    const saveUserToType = async (createdUser) => {
        try {
            const userDetails = new Parse.Object(userType === "tutor" ? "Tutor" : "Funcionario");
            userDetails.set("nome", username);
            userDetails.set("usuario", createdUser);
            userDetails.set("email", email);
            userDetails.set("senha", password);
            await userDetails.save();
        } catch (error) {
            console.log("FULL SERVER ERROR:", JSON.stringify(error, null, 2));
            Alert.alert("Erro ao salvar detalhes do usuário", error.message);
        }
    }
    return (
        <View style={styles.container}>
            <View>
            <Text>Tipo de Usuário</Text>
            <View>
                <Picker
                    selectedValue={userType}
                    onValueChange={setUserType}
                >
                    <Picker.Item label="Tutor de animal" value="tutor"/>
                    <Picker.Item label="Servidor" value="funcionario"/>
                </Picker>
            </View>
            <Text>Nome Completo</Text>
            <TextInput
                placeholder='Seu nome completo'
                value={username}
                onChangeText={setUsername}
                keyboardType='default'
            />
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
                secureTextEntry
            />
            <TouchableOpacity onPress= { executeSignup }>
                <Text>Criar conta</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default signupView;