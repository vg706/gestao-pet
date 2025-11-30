// app/index.jsx
import { View, Text, TextInput, Alert, TouchableOpacity, Platform } from 'react-native';
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

    // Componente Picker para Web
    const WebPicker = () => (
        <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={{
                width: '100%',
                padding: '12px 15px',
                border: '1px solid #dce0e4',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                fontSize: '16px',
                marginBottom: '8px'
            }}
        >
            <option value="tutor">Tutor de animal</option>
            <option value="funcionario">Servidor</option>
        </select>
    );

    // Componente Picker para Mobile
    const MobilePicker = () => (
        <View style={styles.pickerContainer}>
            <Picker
                style={styles.picker}
                selectedValue={userType}
                onValueChange={(itemValue) => setUserType(itemValue)}
            >
                <Picker.Item label="Tutor de animal" value="tutor"/>
                <Picker.Item label="Servidor" value="funcionario"/>
            </Picker>
        </View>
    );

    return (
        <View style={styles.loginContainer}>
            <View style={styles.signupCard}>
                <Text style={styles.loginTitle}>Gestão Pet</Text>
                <Text style={styles.loginSubtitle}>Acompanhamento Veterinário</Text>
                
                <Text style={styles.textLabel}>Tipo de Usuário</Text>
                {Platform.OS === 'web' ? <WebPicker /> : <MobilePicker />}

                <Text style={styles.textLabel}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite seu email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                <Text style={styles.textLabel}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite sua senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />

                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={executeUserLogin}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Não tem conta?</Text>
                    <TouchableOpacity onPress={() => router.navigate('/signup')}>
                        <Text style={styles.signupButton}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}