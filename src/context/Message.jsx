import { createContext, useContext, useState } from "react"

const Context = createContext();

const MessageProvider = ({ children }) => {
    const [receipientUID, setRecipientUID] = useState(null);
  return (
    <Context.Provider value={{details: receipientUID, func: setRecipientUID}}>
        {children}
    </Context.Provider>
  )
}

export default MessageProvider

export const useRecipientProvider = () => {
    const context = useContext(Context)
    return context;
}