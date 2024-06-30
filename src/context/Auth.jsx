import { createContext, useContext, useEffect, useState } from "react"


const Context = createContext();

const Auth = ({ children }) => {
    // const autth = getAuth();

    const [auth, setAuth] = useState({
        isActive: false,
        myUID: null
    })

 
    
  return (
    <Context.Provider value={{ details: auth, func: setAuth }}>
        {children}
    </Context.Provider>
  )
}

export default Auth

export const useAuthProvider = () => {
    const context = useContext(Context)
    return context
}