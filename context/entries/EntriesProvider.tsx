import { FC, ReactNode, useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';

import { Entry } from '</interfaces>';
import { entriesApi } from '</apis>';

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE : EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  
  const addNewEntry = async ( description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries',{ description })
    
    dispatch({ type: '[Entry] - Add-Entry', payload: data})
  }

  const updateEntry = ( entry: Entry ) => {
    dispatch({type: '[Entry] - Entry-Updated', payload: entry})
  }

  const refreshEntries = async( ) => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    
    dispatch({ type: '[Entry] - Refresh-Data', payload: data })
  }
  
  useEffect(() => {
    refreshEntries()
  }, [])
  

  return (
    <EntriesContext.Provider value={{
      ...state,

      //Methods
      addNewEntry,
      updateEntry
    }}>
    { children }
    </EntriesContext.Provider>
  )
}