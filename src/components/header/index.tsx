import { colors } from '@/src/constants/colors'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const handleGoBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={handleGoBack}>
            <Feather name="arrow-left" size={24} color={colors.white} />
          </Pressable>
          <View style={styles.title}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 16,
    paddingTop: 4,
  },
  content: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  button: {
    position: 'absolute',
    left: 0,
  },
  title: {
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
})
