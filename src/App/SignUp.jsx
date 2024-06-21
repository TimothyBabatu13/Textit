import { useEffect, useState } from "react";
import GoBack from "../Components/GoBack";
import Input from "../Components/Input";
import app from "../Firebase"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, addDoc, collection} from "firebase/firestore";
import { useAuthProvider } from "../context/Auth";
import { UseSignUp } from "../utils/Auth";
import { useNavigate } from "react-router-dom";
import { SendData } from "../utils/User";
import { FormatFirebaseError } from "../utils/formatFirebaseError";

const SignUp = () => {
  const { func } = useAuthProvider()
    const [text, setText] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const auth = getAuth();
    const db = getFirestore(app);
    const navigate = useNavigate();
    const userCollection = collection(db, "users");
    const messagesCollection = collection(db, "messages");
    
    const handleChange = e => {
        setText(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    
    //I should send the userId together too with the data sent to firestore.
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(text.password !== text.confirmPassword) {
        console.log("I can't process this.")
        toast.error('passwords do not match')
        return;
      };

      const res = await UseSignUp(auth, text.email, text.password);
      if(res.errorMessage){
        toast.error(FormatFirebaseError(res.errorMessage))
      }
      if(res.response === 'ok'){
        toast.success('account created')
        SendData('users', {
          uid: res.uid,
          email: text.email,
          friends: [],
          name: text.name,
          imgURL: ''
        });
        navigate('/')
      }
    }
  return (
    <section className="overall--container">
      <ToastContainer />
        <GoBack />
        <form onSubmit={handleSubmit} style={styles.form} action="" >
            <h5 style={styles.h5}>Sign up with Email</h5>
            <p style={styles.p}>Get chatting with friends and family today by signing up for our chat app!</p>
            
            <Input 
              name="name" 
              id="name" 
              type="text" 
              value={text.name}
              onChange={handleChange}
              labeText="Your name"
            />
          
            <Input 
              name="email" 
              id="email" 
              type="email"
              value={text.email}
              onChange={handleChange}
              labeText="Your email" 
            />
            
            <Input 
                name="password"
                id="password"
                type="password"
                labeText="Password"
                value={text.password}
                onChange={handleChange}    
            />
            
            <Input 
                name="confirmPassword"
                id="confirm-password"
                type="password"
                labeText="Confirm Password"
                value={text.confirmPassword}
                onChange={handleChange}    
            />
            <button className="cursor--pointer" style={styles.button} type="submit">Create an account</button>
        </form>
    </section>
  )
}
const styles = {
  form: {
    marginTop: "10%"
  },
  h5:{
    textAlign: "center",
    fontSize: "1.5em",
    color: "#3D4A7A",
  },
  p:{
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1em",
    fontWeight: "lighter",
    color: "#797C7B",
  },
  button: {
    display: "block",
    width: "100%",
    marginTop: "10%",
    padding: "10px 0",
    borderRadius: "10px",
    color: "white",
    background: "linear-gradient(271deg, #43116A 36.61%, #68E1FD 106.23%)",
    border: "none"
  },
}
export default SignUp