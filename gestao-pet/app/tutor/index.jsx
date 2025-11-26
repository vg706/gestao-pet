import { View, Text } from 'react-native';
import { Stack } from "expo-router";
export default function tutorHomeView() {
    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />  
            <Text>Tutor Home</Text>
        </View>
    )
}
