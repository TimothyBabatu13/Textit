import Lottie from "lottie-react";
import groovyWalkAnimation from "./loadingAnimation.json";
const LoadingAnimation = () => {
    
  return (
    <div style={{height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><Lottie animationData={groovyWalkAnimation} /></div>
  )
}

export default LoadingAnimation