import { useState } from "react";
import GoBack from "../Components/GoBack";
import Input from "../Components/Input";
import app from "../Firebase"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { getFirestore, addDoc, collection} from "firebase/firestore";

const SignUp = () => {

    const [text, setText] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const auth = getAuth();
    const db = getFirestore(app);
    const userCollection = collection(db, "users");
    const messagesCollection = collection(db, "messages");
    
    const handleChange = e => {
        setText(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //I should send the userId together too with the data sent to firestore.
    const handleSubmit = (e) => {
      e.preventDefault();
      if(text.password !== text.confirmPassword) return console.log("I can't process this.");

      createUserWithEmailAndPassword(auth, text.email, text.password)
      .then((userCredential) => { 
        console.log("user account created succesfully", userCredential);
        updateProfile(auth.currentUser, {
          displayName: text.name,
        })
        .then(success => {
          console.log("updated user's name...", success)
          addDoc(userCollection, {
            name: text.name,
            email: text.email,
            img: "",
            userUID: auth.currentUser.uid,
            friends: []
          })
          .then(success => {
            console.log("data sent successfully.", success)
            addDoc(messagesCollection, {
              name: text.name,
              email: text.email,
              userUID: userCredential.user.uid
            })
            .then(res => console.log("Message table updated", res))
            .catch(err => console.log("error occured", err))
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    }
  return (
    <section className="overall--container">
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