import { useState, useEffect, useContext } from "react";
import Input from "../Components/Input";
import GoBack from "../Components/GoBack";
import { useNavigate } from "react-router-dom";

import App from "../App";
import { Facebook, Apple, Google } from './../Components/Svg';
import { useLogin } from "../utils/Auth";
import { getAuth } from "firebase/auth";
import { useAuthProvider } from "../context/Auth";
import { ToastContainer, toast } from 'react-toastify';
import { FormatFirebaseError } from "../utils/formatFirebaseError";


const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { func } = useAuthProvider();
  
  const [text, setText] = useState({
    email: "",
    password: ""
  })




  const handleChange = (e) =>{
    setText(prev =>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await useLogin(auth, text.email, text.password)
    if(res.response === '404'){
      toast.error(FormatFirebaseError(res.details))
    }
    if(res.response === 'ok'){
      toast.success('login succesful')
      navigate('/message')
      func(prev => ({
        ...prev,
        isActive: true,
        myUID: res.uid
      }))
    }
    
}

  const handleResetPassword = (e) =>{
    e.preventDefault();
  }
  
  return (
    <section className="overall--container">
      <ToastContainer />
        <GoBack />
        <form style={styles.form} className="login--form" action="" onSubmit={handleSubmit}>
            <h5 style={styles.h5}>Log in to Chatbox</h5>
            <p style={styles.p}>Welcome back! Sign in using your social account or email to continue as</p>
        <div style={styles.socialMediaImageContainer}>
          <div className="cursor--pointer">
            <Facebook />
          </div>
          <div className="cursor--pointer">
            <Google />
          </div>
          <div className="cursor--pointer">
            <Apple />
          </div>
            </div>
            <div style={styles.or}>
              <div style={styles.line}></div>
              <h6 style={styles.orText}>OR</h6>
              <div style={styles.line}></div>
            </div>
    
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
              value={text.password}
              onChange={handleChange} 
              labeText="Password"
            />
            <button className="cursor--pointer" style={styles.button} type="submit">Log in</button>
            <a style={styles.link} onClick={handleResetPassword} href="">Forgot password?</a>
            <a style={styles.link} href="/signup">Sign up</a>
        </form>
    </section>
  )
}

const styles = {
  form: {
    marginTop: "10%",
  },
  h5:{
    textAlign: "center",
    fontSize: "1.5em",
    color: "#3D4A7A"
  },
  p:{
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1em",
    fontWeight: "lighter",
    color: "#797C7B",
  },
  socialMediaImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0"
  },
  or: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  line: {
    flex: 2,
    width: "auto",
    backgroundColor: "#CDD1D0",
    height: "1px"
  },
  orText: {
    padding: "10px"
  },
  button: {
    display: "block",
    width: "100%",
    marginTop: "10%",
    padding: "10px 0",
    border: "none",
    borderRadius: "10px",
    color: "white",
    background: "linear-gradient(271deg, #43116A 36.61%, #68E1FD 106.23%)"
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    marginTop: "10px",
    color: "#3D4A7A",
  }
}
export default Login