import { colors } from '@/src/constants/colors'
import { api } from '@/src/services/api'
import { useDataStore } from '@/src/store/data'
import { Diet as DietType } from '@/src/types/diet'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import {
  Platform,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface RespondeData {
  data: DietType
}

export default function Diet() {
  const user = useDataStore((state) => state.user)

  const { data, isFetching, error } = useQuery({
    queryKey: ['diet'],
    queryFn: async () => {
      try {
        const response = await api.post<RespondeData>('/create', user)

        return response.data.data
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleShare = async () => {
    try {
      if (data && data && Object.keys(data).length === 0) return

      const supplements = `${data?.suplementos.map((item) => ` ${item}`)}`

      const foods = `${data?.refeicoes.map((item) => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map((food) => ` ${food}`)}`)}`

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`

      await Share.share({
        message,
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
        <Text style={styles.loadingText}>Consultando IA...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text style={styles.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Link href="/">
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Link>

          <Text style={styles.title}>Minha dieta</Text>

          <Pressable onPress={handleShare}>
            <Ionicons
              name="share-social-sharp"
              size={24}
              color={colors.white}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.content}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.objective}>
              Foco:{' '}
              <Text style={{ fontWeight: 'normal' }}>{data.objetivo}</Text>
            </Text>

            <Text style={styles.label}>Refeições:</Text>
            <View>
              <View style={styles.foods}>
                {data.refeicoes.map((food) => (
                  <View key={food.nome} style={styles.food}>
                    <View style={styles.foodHeader}>
                      <Text style={styles.foodName}>{food.nome}</Text>
                      <Ionicons
                        name="restaurant"
                        size={16}
                        color={colors.textPrimary}
                      />
                    </View>

                    <View style={styles.foodContent}>
                      <Ionicons
                        name="time-outline"
                        size={16}
                        color={colors.textPrimary}
                      />
                      <Text>Horário:{food.horario}</Text>
                    </View>

                    <Text style={styles.foodText}>Alimentos:</Text>
                    <View style={styles.meal}>
                      {food.alimentos.map((alimento) => (
                        <Text key={alimento}>{alimento}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.supplements}>
                <Text style={styles.foodName}>Dica suplementos</Text>
                {data.suplementos.map((supplement) => (
                  <Text key={supplement}>{supplement}</Text>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  containerHeader: {
    backgroundColor: colors.green,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    marginBottom: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34,
  },
  contentHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
  },
  buttonShareText: {
    color: colors.white,
  },
  content: {
    paddingHorizontal: 16,
  },
  objective: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  foods: {
    paddingVertical: 14,
    marginTop: 8,
    gap: 8,
  },
  food: {
    backgroundColor: '#DDDEDF',
    borderRadius: 8,
    padding: 14,
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 16,
  },
  meal: {
    flexDirection: 'column',
    gap: 4,
  },
  supplements: {
    backgroundColor: '#DDDEDF',
    borderRadius: 8,
    padding: 14,
    marginVertical: 12,
    gap: 4,
  },
})
