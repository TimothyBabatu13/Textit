import { useState } from "react";
import { Search } from "./Svg";
import { useNavigate } from "react-router-dom";
const Header = ({  text, img, data, id, png }) => {

  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false)
  
  const navigate = useNavigate();  
  const handleFilter = ()=>{
    setShow(prev => !prev)
  }
  
  const handleChange = (e)=>{
    setSearchText(e.target.value);
  }

  const handleProfile = ()=>{
    const logout = confirm("Do you want to logout?")
    if(logout) {
      navigate("/")
    }

    console.log("clicked")
  }
  const handleSubmit = (e) =>{  
    e.preventDefault();
    
  }
  
  const handleAdd = (e)=>{
    
    data()
  }

  
  return (
    <section>
      <header style={styles.header}>
        <div className="cursor--pointer" onClick={handleFilter} style={styles.searchIcon}>
          <Search />
        </div>
        <h4 style={{ fontWeight: "300" }}>{text}</h4>
        <div onClick={handleProfile} className="cursor--pointer">
          {png ? <img height={50} width={50} src={img} /> :  img }
        </div>
    </header>
    {show && 
    <form action="" onSubmit={handleSubmit}>
      <input value={searchText} onChange={handleChange} type="text" name="" id="" />
      <input type="submit" value="Search" />
    </form>
    }
      { /*
      friends && friends.map(friend => (<div key={friend.userUID}>
      <img src={friend.img} alt="userImg" />
      <h3>{friend.name}</h3>
      <button onClick={()=>handleAdd()}>Add user</button>
      </div>)) 
      */}
    </section>
  )
}

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        color: "#fff",
    },
    searchIcon: {
        // background: "red",
        padding: "4px",
        width: "30px",
        height: "30px",
        borderRadius: "50%"
    },
}
export default Header