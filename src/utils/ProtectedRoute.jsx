import {  useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/Auth"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const ProtectedRoute = ({ children }) => {
    //loading is the one that will take care of
    //the animation for me 
    const [loading, setLoading] = useState(true);
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
                setLoading(false)
            } 
            else {
    
                if(validateIfTextIsEqual('/signup')){
                    navigate('/signup')
                    setLoading(false)
                }
                else{
                    navigate('/')
                    setLoading(false)
                }   
            }
    }, );
    return () => {
        isUnsubscribed = true;
        unsubscribe();
    }}, []) 
 
    if(loading){
        return <h1>Please wait...</h1>
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute