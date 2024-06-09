import './App.css'

import { createContext, useState } from 'react';
import AppRouter from './Routes';
import ContextProvider from './context/ContextProvider';


const Context = createContext();
function App() {

  // const [messages, setMessages] = useState([])

  const [text, setText] = useState({
    userUID: "",
    recepientUID: "",
    isActive: "",
    friends: [],
    idOfDocument: "",
    idOfReceipientDocument: "",
  })
  


  
  return (
    <ContextProvider>
      <Context.Provider value={{text}}>
        <div className='container'>
          <AppRouter />
        </div>
    </Context.Provider>
    </ContextProvider>
    
  )
}

export default {App, Context}
