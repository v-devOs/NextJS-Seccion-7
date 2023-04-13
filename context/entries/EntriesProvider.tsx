import { FC, ReactNode, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: [];
}

const Entries_INITIAL_STATE : EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  return (
    <EntriesContext.Provider value={{
      ...state
    }}>
    { children }
    </EntriesContext.Provider>
  )
}