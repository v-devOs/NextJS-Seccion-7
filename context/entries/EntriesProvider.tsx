import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '</interfaces>';

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE : EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Dolor consequat do officia pariatur aute velit sit.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'Et sunt dolore dolor et occaecat do elit.',
      status: 'in-progress',
      createdAt: Date.now() - 10000000,
    },
    {
      _id: uuidv4(),
      description: 'Ex magna duis dolor anim minim aliqua irure excepteur excepteur dolor.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
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