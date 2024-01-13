import './App.css'
import SignUp from './App/SignUp';
import Login from './App/Login';
import Home from './App/Home';
import Chat from './App/Chat';
import GroupChat from './App/GroupChat';
import Error from './App/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
 
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/message' element={<Home />} />
          <Route path='/chat/:id' element={<Chat />}/>
          <Route path='/groupchat/:id' element={<GroupChat />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
