import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form'
import { colors } from '@/src/constants/colors';

interface InputProps {
  name: string
  control: any
  placeholder?: string
  rules?: object
  error?: string
  keyboardType: KeyboardTypeOptions
}

export function Input(props: InputProps) {
 return (
   <View style={styles.container}>
      <Controller 
        control={props.control} 
        name={props.name}
        rules={props.rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
            style={styles.input}
            placeholder={props.placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={props.keyboardType}
          />
        )}  
      />

      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8
  },
  errorText: {
    color: colors.red,
    marginTop: 4
  }
})