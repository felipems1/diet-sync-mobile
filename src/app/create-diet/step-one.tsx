import { Header } from "@/src/components/header";
import { Input } from "@/src/components/input";
import { colors } from "@/src/constants/colors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from "expo-router";
import { useDataStore } from "@/src/store/data";

const schema = z.object({
  name: z.string({ required_error: 'O nome é obrigatório!' }),
  weight: z.string({ required_error: 'O peso é obrigatório!' }),
  age: z.string({ required_error: 'A idade é obrigatório!' }),
  height: z.string({ required_error: 'A altura é obrigatório!' }),
})

type FormData = z.infer<typeof schema>

export default function StepOne() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setStepOne = useDataStore(state => state.setStepOne)

  const handleNextStep = (data: FormData) => {
    setStepOne(data)
    router.push("/create-diet/step-two")
  }

  return (
    <View style={styles.container}>
      <Header title="Passo 1" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite seu nome"
          error={errors.name?.message}
          keyboardType="default"
        />

        <Text style={styles.label}>Peso atual:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Altura:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.75"
          error={errors.height?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Idade:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 24"
          error={errors.age?.message}
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleNextStep)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 8
  },
  button: {
    backgroundColor: colors.orange,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})