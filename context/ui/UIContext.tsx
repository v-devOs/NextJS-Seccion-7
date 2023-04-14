import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean
  isAdding: boolean
  //Methods
  openSideMenu:  () => void,
  closeSideMenu:  () => void,
  setIsAdding: (value: boolean) => void
}

export const UIContext = createContext({} as ContextProps)