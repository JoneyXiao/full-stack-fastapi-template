import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"

interface NavDialogsContextType {
  searchOpen: boolean
  chatOpen: boolean
  openSearch: () => void
  openChat: () => void
  setSearchOpen: (open: boolean) => void
  setChatOpen: (open: boolean) => void
}

export const NavDialogsContext = createContext<NavDialogsContextType | null>(
  null,
)

export function NavDialogsProvider({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const [searchOpen, setSearchOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const value = useMemo(
    () => ({
      searchOpen,
      chatOpen,
      openSearch: () => setSearchOpen(true),
      openChat: () => setChatOpen(true),
      setSearchOpen,
      setChatOpen,
    }),
    [searchOpen, chatOpen],
  )

  return (
    <NavDialogsContext.Provider value={value}>
      {children}
    </NavDialogsContext.Provider>
  )
}

export function useNavDialogs(): NavDialogsContextType {
  const context = useContext(NavDialogsContext)
  if (!context) {
    throw new Error("useNavDialogs must be used within NavDialogsProvider")
  }
  return context
}
