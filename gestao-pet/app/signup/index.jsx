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
    const [password, setPassword] = useState("");
    const executeSignup = async () => {
        const user = new Parse.User();
        user.set("role", userType);
        user.set("username", email); 
        user.set("email", email);
        user.set("password", password);
        
        try {
            await user.signUp();
            Alert.alert("Conta criada!", "Usuário registrado com sucesso.");
            router.replace("/");
        } catch(error) {
            Alert.alert("Erro no cadastro", error.message);
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