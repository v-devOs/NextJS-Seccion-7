import { Entry } from '</interfaces>';
import { createContext } from 'react'

interface ContextProps {
  entries: Entry[]; //Todo falta el tipo de dato del arreglo
}

export const EntriesContext = createContext({} as ContextProps)