import { Stack } from "expo-router";
import '../parse-config';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'gestão-pet',
        }}
      />
    </Stack>
  );
}
