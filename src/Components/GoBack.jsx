import backButton from "../assets/Icons/Back.svg";

const GoBack = () => {
  
  const handleClick = () =>{
    window.history.back();
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