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
        const loca = loc.split("/")
        const arrOfLocation = loca;
        const neededArray = arrOfLocation[arrOfLocation.length -1];
        const location = `/${neededArray}`;
        
        const isLocation = location !== text;
        if(isLocation && !isActive) return true
        return false;
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
                console.log('No user is signed in.');
                navigate('/')   
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