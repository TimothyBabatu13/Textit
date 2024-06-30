import ProtectedRoute from "../utils/ProtectedRoute"
import Auth from "./Auth"
import MessageProvider from "./Message"


const ContextProvider = ({ children }) => {
  return (
        <Auth>
          <MessageProvider>
            {children}
          </MessageProvider>
        </Auth>
  )
}

export default ContextProvider