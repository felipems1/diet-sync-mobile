import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="create-diet/step-one/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="create-diet/step-two/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="diet/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  )
}
