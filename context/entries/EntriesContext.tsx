import { createContext } from 'react'
import { Entry } from '</interfaces>';

interface ContextProps {
  entries: Entry[]; //Todo falta el tipo de dato del arreglo

  //Methods
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry, showSnackBar: boolean) => void
}

export const EntriesContext = createContext({} as ContextProps)