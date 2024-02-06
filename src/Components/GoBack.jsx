import { useNavigate } from "react-router-dom";
import backButton from "../assets/Icons/Back.svg";

const GoBack = () => {
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(-1);
  }

  return (
  <img 
    className="cursor--pointer" 
    src={backButton} 
    alt="back icon" 
    onClick={handleClick}
  />
  )
}

export default GoBack