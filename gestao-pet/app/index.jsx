import { View, Text, TextInput, Button } from 'react-native';
import { useLogin } from './hooks/use-login';
import { getLoginInfo, loginInfo } from './parse-config';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { styles } from './styles';


export default function loginView() {
  const router = useRouter();
  const [userType, setUserType] = useState("tutor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const executeUserLogin = async function () {
    
  }

  return (
      <View style={styles.container}>
          <View>{/*card*/}
            <Text style={styles.title}>Gestão Pet</Text>
            <Text>Acompanhamento Veterinário</Text>
            <Text>Tipo de Usuário</Text>
            <View> {/*picker*/}
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
                // style={?}
                placeholder='Digite seu email'
                value={email}
                onChangeText={val => setEmail(val)}
                keyboardType='email-address'
            />
            <Text>Senha</Text>
            <TextInput
                // style={}
                placeholder='Digite sua senha'
                value={password}
                onChangeText={val => setPassword(val)}
                keyboardType='numbers-and-punctuation'
                secureTextEntry={true}
            />
            <Button
                title='Entrar'
                onPress={handleLogin}
            />
            <Text>
                Não tem conta?
                <Button title="Cadastre-se" onPress={() => router.navigate('/signup')}/>
            </Text>
          </View>
      </View>
  )
}