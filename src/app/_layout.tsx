import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="create-diet/step-one"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="create-diet/step-two"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
