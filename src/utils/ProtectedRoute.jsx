import {  useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/Auth"
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const ProtectedRoute = ({ children }) => {
    const auth = getAuth();
    const navigate = useNavigate()
    const { details : { isActive }, func } = useAuthProvider();
    const loc = window.location.href

    const validateIfTextIsEqual = (text) => {
        const loca = loc.split('/');
        const re = loca[loca.length - 1];
        
        return `/${re}` === text;
    }



    useEffect(()=>{

        let isUnsubscribed = false;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (isUnsubscribed) return;
            if (user) {
                func(prev =>({
                    ...prev,
                    isActive: true,
                    myUID: user.uid
                })) 

                return navigate('/message')
            } 
            else {
    
                if(validateIfTextIsEqual('/signup')){
     
                    return navigate('/signup')
                }
                else{
                    return navigate('/')
                }   
            }
    }, );
    return () => {
        isUnsubscribed = true;
        unsubscribe();
    }}, []) 
 
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute