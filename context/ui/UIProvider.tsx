import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
  children: ReactNode
}

export interface UIState {
  sideMenuOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE : UIState = {
  sideMenuOpen: false,
  isAdding: false,
  isDragging: false
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

  const openSideMenu = () => dispatch({type: 'UI - Open SideBar'})
  
  const closeSideMenu = () => dispatch({ type: 'UI - Close SideBar' })

  const setIsAdding = ( value: boolean ) => {
    dispatch({type: 'UI - Add-Entry', payload: value})
  }

  const startDrgagging = () => dispatch({type: 'UI - Start-Dragging'})
  const endDragging = () => dispatch({type: 'UI - End-Dragging'})

  return (
    <UIContext.Provider value={{
      ...state,
      
      //Methods
      openSideMenu,
      closeSideMenu,
      
      setIsAdding,

      startDrgagging,
      endDragging
    }}>
    { children }
    </UIContext.Provider>
  )
}