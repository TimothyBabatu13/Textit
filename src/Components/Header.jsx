import { useState } from "react";
import app from "../Firebase";
import search from "../assets/Icons/Search.svg";
import { getFirestore, arrayUnion, updateDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Header = ({  text, img, data, id }) => {

  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false)
  const [friends, setFriends] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth();
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
      auth.signOut()
      navigate("/")
    }

    console.log("clicked")
  }
  const handleSubmit = (e) =>{  
    e.preventDefault();
    const filter = async ()=>{
      const q = query(collection(db, "users"), where("email", "==", searchText));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFriends(prev => ([...prev, doc.data()]))
    });
    }
    filter();
  }
  
  const handleAdd = (e)=>{
    const {userUID, name, img, email} = e;
    console.log(userUID, name, img, email)
    const data = async ()=>{
      console.log("data about to update");
      const washingtonRef = doc(db, "users", id);
      await updateDoc(washingtonRef, {
        friends: arrayUnion({
          userUID: userUID,
          name: name,
          img: img,
          email: email,
        })
      }).then((success)=>{
        console.log("success", success)
      }).catch(err => console.log("err", err))
    }
    data()
  }

  
  return (
    <section>
      <header style={styles.header}>
        <img className="cursor--pointer" onClick={handleFilter} style={styles.searchIcon} height="20" width="20" src={search} alt="search icon" />
        <h4 style={{fontWeight:"300"}}>{text}</h4>
        <img onClick={handleProfile} className="cursor--pointer" height="50" width="50" src={img} alt="user image" />
    </header>
    {show && 
    <form action="" onSubmit={handleSubmit}>
      <input value={searchText} onChange={handleChange} type="text" name="" id="" />
      <input type="submit" value="Search" />
    </form>
    }
    {friends && friends.map(friend => (<div key={friend.userUID}>
      <img src={friend.img} alt="userImg" />
      <h3>{friend.name}</h3>
      <button onClick={()=>handleAdd(friend)}>Add user</button>
    </div>))}
    </section>
  )
}

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        color: "#fff"
    },
    searchIcon: {
        background: "red",
        padding: "4px",
        width: "30px",
        height: "30px",
        borderRadius: "50%"
    },
}
export default Header