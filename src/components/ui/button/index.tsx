import { Pressable, Text, StyleSheet } from 'react-native'

interface ButtonProps {
  text: string
  color: string
  textColor: string
  onPress?: () => void
}

export const Button = ({ text, color, textColor, onPress }: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
