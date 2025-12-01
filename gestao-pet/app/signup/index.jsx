// app/signup/index.jsx
import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import Parse from 'parse/react-native.js';
import { styles } from '../../styles/styles';

const SignupView = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("tutor");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Faz o cadastro do usuário depois do preenchimento dos dados essenciais
    const executeSignup = async () => {
        try {
            if (!username || !email || !password) {
                Alert.alert("Erro", "Preencha todos os campos.");
                return;
            }

            // Desloga qualquer usuário atualmente logado (evita usar uma sessão que já tinha sido criada)
            await Parse.User.logOut();

            // Cria um novo Objeto _User que já vem por padrão no Back4App
            const user = new Parse.User();
            user.set("username", email);
            user.set("email", email);
            user.set("password", password);
            user.set("role", userType);

            const createdUser = await user.signUp();
            
            // Salva os detalhes adicionais do usuário na sua classe (Tutor ou Funcionario)
            await saveUserToType(createdUser);
            
            Alert.alert("Conta criada!", "Usuário registrado com sucesso.");
            router.replace("/");
        } catch (error) {
            console.log("RAW ERROR:", error);
            console.log("ERROR KEYS:", Object.keys(error || {}));
            Alert.alert("Erro no cadastro", String(error));
        }
    };
    // Salvar os dados do User no seu tipo (Tutor ou Funcionario)
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
    };

    return (
        <View style={styles.signupContainer}>
            <Stack.Screen options={{ title: "Cadastro" }} />
            
            <View style={styles.signupCard}>
                <Text style={styles.signupTitle}>Criar Conta</Text>
                <Text style={styles.signupSubtitle}>Preencha seus dados para se cadastrar</Text>
                
                {/* Tipo de Usuário */}
                <Text style={styles.textLabel}>
                    Tipo de Usuário <Text style={styles.requiredField}>*</Text>
                </Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        selectedValue={userType}
                        onValueChange={(value) => setUserType(value)}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="Tutor de animal" value="tutor" />
                        <Picker.Item label="Servidor" value="funcionario" />
                    </Picker>
                </View>

                {/* Nome Completo */}
                <Text style={styles.textLabel}>
                    Nome Completo <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Seu nome completo'
                    value={username}
                    onChangeText={setUsername}
                    keyboardType='default'
                    autoCapitalize='words'
                />

                {/* Email */}
                <Text style={styles.textLabel}>
                    Email <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite seu email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                {/* Senha */}
                <Text style={styles.textLabel}>
                    Senha <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite sua senha'
                    value={password}
                    onChangeText={setPassword}
                    keyboardType='numbers-and-punctuation'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Text style={styles.passwordHint}>
                    Use letras, números e caracteres especiais para maior segurança
                </Text>

                {/* Botão Criar Conta */}
                <TouchableOpacity 
                    style={styles.signupButton}
                    onPress={executeSignup}
                >
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>

                {/* Link para Login */}
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={{ alignItems: 'center' }}
                >
                    <Text style={styles.signupSubtitle}>
                        Já tem uma conta? <Text style={{ color: '#3498db', fontWeight: '600' }}>Fazer login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupView;