import search from "../assets/Icons/Search.svg";
import addIcon from "../assets/Icons/plus.svg"
import user from "../assets/images/user.png";
import friend1 from "../assets/images/friend1.png";
import friend2 from "../assets/images/friend2.png";
import friend3 from "../assets/images/friend3.png";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const data = [
        {
            img: friend1,
            name: "Adil"
        },
        {
            img: friend2,
            name: "Mariana"
        },
        {
            img: friend3,
            name: "Dean"
        },
        {
            img: friend1,
            name: "Max"
        },
    ]

    const message = [
        {
            img: friend1,
            name: "Alex Linderson",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: 3,
            isActive: true,
            recipientUid: "23"
        },
        {
            img: friend2,
            name: "Team Align",
            message: "Dont miss to attend the meeting",
            timeSent: "2 min ago",
            noOfUnreadMessages: 4,
            isActive: true,
            recipientUid: "26"
        },
        {
            img: friend3,
            name: "John Abraham",
            message: "Hey! Can you join the meeting?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "30"
        },
        {
            img: friend1,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "3"
        },
        {
            img: friend1,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true,
            recipientUid: "93"
        },
        {
            img: friend1,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "3"
        },
        {
            img: friend1,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true,
            recipientUid: "93"
        },
        {
            img: friend1,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "3"
        },
        {
            img: friend1,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true,
            recipientUid: "93"
        },
    ]

    const handleNavigateToChat = (id) =>{
        navigate(`/chat/${id}`);
    }

  return (
    <div style={{background: "rgba(3, 4, 7, 0.642)"}}>
        <section style={styles.container} className="overall--container">
        <header style={styles.header}>
            <img className="cursor--pointer" style={styles.searchIcon} height="20" width="20" src={search} alt="search icon" />
            <h4 style={{fontWeight:"300"}}>Home</h4>
            <img className="cursor--pointer" height="50" width="50" src={user} alt="user image" />
        </header>
        <div className="home--status" style={styles.status}>
            <div className="cursor--pointer">
                <div style={styles.userStatus}>
                    <img width="50" height="50" src={user} alt="user image" />
                    <img style={styles.addIcon} src={addIcon} alt="add icon" />
                </div>
                <h5 style={{fontWeight:"lighter"}}>My status</h5>
            </div>
            {data.map((person, id) =>(<div style={styles.friendsStatus} className="cursor--pointer" key={id}>
                <img style={styles.friendsStatusImg} src={person.img} alt={person.name} />
                <h5 style={{fontWeight:"lighter"}}>{person.name}</h5>
            </div>))}
        </div>
        
    </section>
    <div className="overall--container" style={styles.messageContainer}>
        <div style={styles.messageDash}></div>
            {message.map((person, id) => (
                <div onClick={()=> handleNavigateToChat(person.recipientUid)} className="cursor--pointer list--user--message" style={styles.message} key={id}>
                    <div style={styles.messageImageContainer}>
                        <img style={styles.messageImage} src={person.img} alt="receipient image" />
                        {person.isActive && <div style={styles.greenDot}></div>}
                    </div>
                    <div style={styles.messageDetails}>
                        <h4 style={styles.messageDetailsName}>{person.name}</h4>
                        <p style={styles.messageDetailsP}>{person.message}</p>
                    </div>
                    <div style={styles.timeSentDetails}>
                        <h6>{person.timeSent}</h6>
                        <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}><div></div>{person.noOfUnreadMessages && <p style={styles.noOfUnreadMessages}>{person.noOfUnreadMessages}</p>}</div>
                    </div>
                </div>
            ))}
        </div>
      <Footer />
    </div>
    
  )
}

const styles = {
    // container:{
    //     background: "url(<path-to-image>), lightgray 50% / cover no-repeat"
    // },
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
    status: {
        display: "flex",
        alignItems: "center",
        overflowX: "scroll",
        color: "#fff",
    },
    userStatus: {
        position: "relative",
        marginRight: "15px",
        marginBottom: "10px"
    },
    addIcon: {
        position: "absolute",
        bottom: "7px",
        right: '0',
        height: "12px",
        width: "12px",
        background: "white",
        borderRadius: "50%"
    },
    friendsStatus: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "15px"
    },
    friendsStatusImg: {
        marginBottom: "10px",
        border: "1px solid red",
        borderRadius: "50%",
        height: "50px",
        width: "50px"
    },
    messageContainer: {
        background: "#fff",
        padding: "20px",
        borderTopRightRadius: "60px",
        borderTopLeftRadius: "60px",
        marginTop: "20px",
        position: "relative",
        overflowY: "scroll",
        minHeight: "100px",
        color: "#000",
    },
    message: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px"
    },
    messageImageContainer:{
        position: "relative",
        marginRight: "15px",
    },
    messageImage: {
        borderRadius: "50%",
        height: "50px",
        width: "50px"
    },
    messageDash: {
        position: "absolute",
        top: "10px",
        height: "3px",
        width: "35px",
        background: "rgb(205, 209, 208)",
        left: "50%",
        margin: "auto",
        transform: "translateX(-50%)"
    },
    greenDot:{
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        position: "absolute",
        bottom: "8px",
        right: 0,
        background: "green"
    },
    messageDetails: {
        display: "flex",
        flexDirection: "column",
    },
    messageDetailsName: {

    },
    messageDetailsP: {
        fontWeight: "lighter",
        fontSize: "0.8em"
    },
    timeSentDetails: {
        marginLeft: "auto",
    },
    noOfUnreadMessages:{
        background: "red",
        color: "#fff",
        padding: "10px",
        borderRadius: "50%",
        height: "20px",
        width: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.6em"
    }
}
export default Home