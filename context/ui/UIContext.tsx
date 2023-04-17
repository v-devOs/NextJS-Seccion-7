import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean
  isAdding: boolean
  isDragging: boolean
  //Methods
  openSideMenu:  () => void,
  closeSideMenu:  () => void,

  setIsAdding: (value: boolean) => void

  startDrgagging: () => void
  endDragging: () => void
}

export const UIContext = createContext({} as ContextProps)