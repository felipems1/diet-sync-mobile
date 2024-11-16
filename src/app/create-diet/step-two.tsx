import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Header } from "@/src/components/header";
import { Input } from "@/src/components/input";
import { colors } from "@/src/constants/colors";
import { Select } from "@/src/components/select";
import { genderOptions } from "@/src/constants/genderOptions";
import { levelOptions } from "@/src/constants/levelOptions";
import { objectiveOptions } from "@/src/constants/objectiveOptions";
import { useDataStore } from "@/src/store/data";

const schema = z.object({
  gender: z.string({ required_error: 'O sexo é obrigatório!' }),
  objective: z.string({ required_error: 'O objetivo é obrigatório!' }),
  level: z.string({ required_error: 'Selecione seu level' }),
})

type FormData = z.infer<typeof schema>

export default function StepTwo() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setStepTwo = useDataStore(state => state.setStepTwo)

  const handleCreateDiet = (data: FormData) => {
    setStepTwo(data)
  } 

 return (
   <View style={styles.container}>
    <Header title="Passo 2" />
    <ScrollView style={styles.content}>
      <Text style={styles.label}>Sexo:</Text>
      <Select 
        name="gender"
        control={control}
        placeholder="Selecione seu sexo"
        error={errors.gender?.message}
        options={genderOptions}
      />

      <Text style={styles.label}>Nível de atividade física:</Text>
      <Select 
        name="level"
        control={control}
        placeholder="Selecione nível de atividade física"
        error={errors.level?.message}
        options={levelOptions}
      />

      <Text style={styles.label}>Objetivo:</Text>
      <Select 
        name="objective"
        control={control}
        placeholder="Selecione seu objetivo"
        error={errors.objective?.message}
        options={objectiveOptions}
      />

      <Pressable style={styles.button} onPress={handleSubmit(handleCreateDiet)}>
        <Text style={styles.buttonText}>Gerar dieta</Text>
      </Pressable>
    </ScrollView>
   </View>
  );
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