import { useNavigate } from "react-router-dom";
import backButton from "../assets/Icons/Back.svg";
import { BackIcon } from "./Svg";

const GoBack = () => {
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(-1);
  }

  return (
    <BackIcon onClick={handleClick} className="cursor--pointer" />
  )
}

export default GoBack