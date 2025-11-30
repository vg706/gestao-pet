import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function setParseConfig() {
    if (!Parse.applicationId) {
        Parse.setAsyncStorage(AsyncStorage);
        Parse.initialize(
            'O3aez7MvVz3NWIVRT7Z63oJSQXaRbH7ghIGiF1BR',
            'z6rCiH0ATsZ2XC1aUVIYjyyyQdtObwKQRuWwWizO'
        );
        Parse.serverURL = 'https://parseapi.back4app.com/';
    }
}