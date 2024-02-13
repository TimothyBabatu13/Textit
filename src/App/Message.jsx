import Header from "../Components/Header";
import Background from "../Components/Background";
import RenderHomeBackground from "../Components/RenderHomeBackground";
import Footer from "../Components/Footer";
import addIcon from "../assets/Icons/plus.svg";
import user from "../assets/images/user.png";
import friend1 from "../assets/images/friend1.png";
import friend2 from "../assets/images/friend2.png";
import friend3 from "../assets/images/friend3.png";
import { useNavigate } from "react-router-dom";

//user--- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/user.png?alt=media&token=2b34388c-9d32-44a1-bf7c-25fb110373b9
//adil-- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend1.png?alt=media&token=9ec0cc7b-7b82-4525-bd72-4015f4ec3357
//mariana-- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend2.png?alt=media&token=f3a0dc20-8609-42ac-9476-28c6a77ee633
//dean-- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend3.png?alt=media&token=8dc23146-bdd6-4f51-8949-e600ba6a5deb


const Message = () => {

    const userURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/user.png?alt=media&token=2b34388c-9d32-44a1-bf7c-25fb110373b9";
    const AdilURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend1.png?alt=media&token=9ec0cc7b-7b82-4525-bd72-4015f4ec3357";
    const marianaURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend2.png?alt=media&token=f3a0dc20-8609-42ac-9476-28c6a77ee633";
    const deanURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend3.png?alt=media&token=8dc23146-bdd6-4f51-8949-e600ba6a5deb";
  
    const navigate = useNavigate();
    
    
    const data = [
        {
            img: AdilURL,
            name: "Adil"
        },
        {
            img: marianaURL,
            name: "Mariana"
        },
        {
            img: deanURL,
            name: "Dean"
        },
        {
            img: marianaURL,
            name: "Max"
        },
    ]

    const message = [
        {
            img: AdilURL,
            name: "Alex Linderson",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: 3,
            isActive: true,
            recipientUid: "23"
        },
        {
            img: marianaURL,
            name: "Team Align",
            message: "Dont miss to attend the meeting",
            timeSent: "2 min ago",
            noOfUnreadMessages: 4,
            isActive: true,
            recipientUid: "26"
        },
        {
            img: deanURL,
            name: "John Abraham",
            message: "Hey! Can you join the meeting?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "30"
        },
        {
            img: AdilURL,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "3"
        },
        {
            img: marianaURL,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true,
            recipientUid: "93"
        },
        {
            img: deanURL,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "3"
        },
        {
            img: AdilURL,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true,
            recipientUid: "93"
        },
        {
            img: marianaURL,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false,
            recipientUid: "3"
        },
        {
            img: deanURL,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true,
            recipientUid: "93"
        },
    ]

    const handleNavigateToChat = (id) => {
        console.log("hi")
        navigate(`/chat/${id}`);
    }


  return (
    <Background>
        <section style={styles.container} className="overall--container">
            <Header 
                text="Home"
                  img={userURL} 
                  png
                // id={idOfDocument}
            />
            <div className="home--status" style={styles.status}>
                <div className="cursor--pointer">
                    <div style={styles.userStatus}>
                        <img width="50" height="50" src={userURL} alt="user image" />
                        <img style={styles.addIcon} src={addIcon} alt="add icon" />
                    </div>
                    <h5 style={{fontWeight:"lighter"}}>My status</h5>
                  </div>

                  {/* Status */}
                  {
                      data.map((friend, index) => (
                          <div style={styles.friendsStatus} onClick={()=>handleNavigateToChat(friend.userUID || index)} className="cursor--pointer" key={index}>
                            <img style={styles.friendsStatusImg} src={friend.img || user} alt={friend.name} />
                            <h5 style={{fontWeight:"lighter"}}>{friend.name}</h5>          
                          </div>
                      ))
                  }
               
            </div>
            
        </section>
        <RenderHomeBackground>
            
            {message.map((person, id) => (
                        <div onClick={()=> {
                            handleNavigateToChat(id)
                            //handleNavigateToChat(person.recipientUid)
                        }} className="cursor--pointer list--user--message" style={styles.message} key={id}>
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
        </RenderHomeBackground>
        <Footer />
    
    </Background>
    
  )
}

const styles = {
    container:{
        // background: "url(<path-to-image>), lightgray 50% / cover no-repeat"
        // background: "linear-gradient(271deg, rgb(67, 17, 106) 36.61%, rgb(104, 225, 253) 106.23%)"
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
        marginRight: "15px",
    },
    friendsStatusImg: {
        marginBottom: "10px",
        border: "1px solid red",
        borderRadius: "50%",
        height: "50px",
        width: "50px"
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
export default Message