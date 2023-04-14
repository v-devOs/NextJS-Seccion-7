import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
  children: ReactNode
}

export interface UIState {
  sideMenuOpen: boolean;
  isAdding: boolean
}

const UI_INITIAL_STATE : UIState = {
  sideMenuOpen: false,
  isAdding: false,
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

  const openSideMenu = () => dispatch({type: 'UI - Open SideBar'})
  
  const closeSideMenu = () => dispatch({ type: 'UI - Close SideBar' })

  const setIsAdding = ( value: boolean ) => {
    dispatch({type: 'UI - Add-Entry', payload: value})
  }

  return (
    <UIContext.Provider value={{
      ...state,
      
      //Methods
      openSideMenu,
      closeSideMenu,
      
      setIsAdding
    }}>
    { children }
    </UIContext.Provider>
  )
}