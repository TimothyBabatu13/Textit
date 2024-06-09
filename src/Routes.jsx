import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./App/Login"
import SignUp from "./App/SignUp"
import Message from "./App/Message"
import Call from "./App/Call"
import Contact from "./App/Contact"
import Setting from "./App/Setting"
import Chat from "./App/Chat"
import GroupChat from "./App/GroupChat"
import Error from "./App/Error"
import ProtectedRoute from "./utils/ProtectedRoute"


const AppRouter = () => {
    
  return (
    <BrowserRouter>
      <ProtectedRoute>

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
      </ProtectedRoute>
      </BrowserRouter>
  )
}

export default AppRouter