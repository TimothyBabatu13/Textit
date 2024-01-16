import { useNavigate } from "react-router-dom"

const Error = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () =>{
        navigate("/")
    }
  return (
    <div>
        <h3>This page doesn't exist</h3>
        <button onClick={handleNavigateHome}>Go home</button>
    </div>
  )
}

export default Error