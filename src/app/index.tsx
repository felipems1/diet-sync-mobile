import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import { Link } from 'expo-router'
import { Button } from '../components/ui/button'

export default function Presentation() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} alt="" />

      <Text style={styles.title}>Diet Sync</Text>

      <Text style={styles.description}>
        Sua dieta personalizada com inteligência artificial.
      </Text>

      <Link href="/create-diet/step-one" asChild>
        <Button text="Começar" color={colors.green} textColor={colors.white} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: colors.green,
    fontSize: 32,
    fontWeight: 500,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 36,
  },
})
