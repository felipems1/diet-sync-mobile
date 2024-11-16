interface Meal {
  horario: string
  nome: string
  alimentos: string[]
}

export interface Diet {
  nome: string
  sexo: string
  idade: number
  altura: number
  peso: number
  objetivo: number
  refeicoes: Meal[]
  suplementos: string[]
}
