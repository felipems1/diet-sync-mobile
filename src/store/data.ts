import { create } from 'zustand'
import { User } from '../types/user'

type dataStepOne = Omit<User, "gender" | "objective" | "level">
type dataStepTwo = Pick<User, "gender" | "objective" | "level">

type DataState = {
  user: User
  setStepOne: (data: dataStepOne) => void
  setStepTwo: (data: dataStepTwo) => void
}

export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    age: "",
    level: "",
    objective: "",
    gender: "",
    height: "",
    weight: ""
  },

  setStepOne: (data) => set((state) => ({ user: {...state.user, data} })),

  setStepTwo: (data) => set((state) => ({ user: {...state.user, data} }))
}))