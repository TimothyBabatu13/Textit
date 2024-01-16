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
import app from './Firebase';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Context = createContext();
function App() {
  const [text, setText] = useState({
    userUID: "",
    recepientUID: ""
  })
  const auth = getAuth();


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setText(prev=>({
          ...prev,
          userUID: uid
        }))
        console.log("user signed in");
      } else {
        console.log("user is not signed in")
      }
    });
  }, [])
  
  return (
    <Context.Provider value={text}>
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
