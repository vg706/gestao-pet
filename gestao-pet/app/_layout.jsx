import { Stack } from "expo-router";
import {setParseConfig} from '../parse-config';

setParseConfig();
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
