import './App.css'
import SignUp from './App/SignUp';
import Login from './App/Login';
import Message from './App/Message';
import Chat from './App/Chat';
import GroupChat from './App/GroupChat';
import Call from './App/Call';
import Contact from './App/Contact';
import Setting from './App/Setting';
import Error from './App/Error';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { createContext, useState } from 'react';


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
    <Context.Provider value={{text}}>
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/message' element={<Message />} />
          <Route path='/calls' element={<Call />}/>
          <Route path='/contacts' element={<Contact />}/>
          <Route path='/settings' element={<Setting />}/>
          <Route path='/chat/:id' element={<Chat />}/>
          <Route path='/groupchat/:id' element={<GroupChat />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Context.Provider>
  )
}

export default {App, Context}
