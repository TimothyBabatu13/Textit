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
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react';
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';

const Context = createContext();
function App() {
  const [text, setText] = useState({
    userUID: "",
    recepientUID: "",
    isActive: "",
    friends: [],
  })

  const auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    
      if (user) {
        const uid = user.uid;
        setText(prev=>({
          ...prev,
          userUID: uid 
        }))
        setText(prev => ({
          ...prev,
          isActive: true
        }))


       
      } else {
        setText(prev => ({
          ...prev,
          isActive: false
        }));
        console.log("logged out")
      }
    });
  }, [text.userUID])

  useEffect(()=>{
    const db = getFirestore(app);
    const myFriends = collection(db, "users");
    const subscribe = onSnapshot(myFriends, (result)=>{
      const data = result.docs.map(item => item.data());
      const newData = data.filter(item => item.userUID === text.userUID)[0]?.friends;
      // console.log(newData)
      setText(prev =>({
        ...prev,
        friends: newData
      }))
  })
  return() => subscribe()
  }, [text.userUID])

  const changeValue = (userUID, recepientUID) => {
    setText(prev =>({
      ...prev,
      userUID: userUID,
      recepientUID: recepientUID || "" 
    }))
  }
  return (
    <Context.Provider value={{text, changeValue}}>
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
