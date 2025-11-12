import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function setParseConfig() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize('O3aez7MvVz3NWIVRT7Z63oJSQXaRbH7ghIGiF1BR', 'z6rCiH0ATsZ2XC1aUVIYjyyyQdtObwKQRuWwWizO');
    Parse.serverURL = 'https://parseapi.back4app.com/';
}