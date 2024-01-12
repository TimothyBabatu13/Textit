import search from "../assets/Icons/Search.svg";
import addIcon from "../assets/Icons/plus.svg"
import user from "../assets/images/user.png";
import friend1 from "../assets/images/friend1.png";
import friend2 from "../assets/images/friend2.png";
import friend3 from "../assets/images/friend3.png";
import Footer from "../Components/Footer";

const Home = () => {
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
            isActive: true
        },
        {
            img: friend1,
            name: "Team Align",
            message: "Dont miss to attend the meeting",
            timeSent: "2 min ago",
            noOfUnreadMessages: 4,
            isActive: true
        },
        {
            img: friend1,
            name: "John Abraham",
            message: "Hey! Can you join the meeting?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false
        },
        {
            img: friend1,
            name: "Sabila Sayma",
            message: "How are you today?",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: false
        },
        {
            img: friend1,
            name: "John Borini",
            message: "Have a good ay",
            timeSent: "2 min ago",
            noOfUnreadMessages: "",
            isActive: true
        },
    ]
  return (
    <div style={{background: "rgba(3, 4, 7, 0.642)"}}>
        <section style={styles.container} className="overall--container">
        <header style={styles.header}>
            <img className="cursor--pointer" src={search} alt="search icon" />
            <h4>Home</h4>
            <img className="cursor--pointer" src={user} alt="user image" />
        </header>
        <div style={styles.status}>
            <div className="cursor--pointer">
                <div style={styles.userStatus}>
                    <img src={user} alt="user image" />
                    <img style={styles.addIcon} src={addIcon} alt="add icon" />
                </div>
                <h5>My status</h5>
            </div>
            {data.map((person, id) =>(<div className="cursor--pointer" key={id}>
                <img src={person.img} alt={person.name} />
                <h5>{person.name}</h5>
            </div>))}
        </div>
        
    </section>
    <div className="overall--container" style={styles.messageContainer}>
        <div style={styles.messageDash}></div>
            {message.map((person, id) => (
                <div className="cursor--pointer list--user--message" style={styles.message} key={id}>
                    <div style={styles.messageImageContainer}>
                        <img src={person.img} alt="receipient image" />
                        {person.isActive && <div style={styles.greenDot}></div>}
                    </div>
                    <div style={styles.messageDetails}>
                        <h4>{person.name}</h4>
                        <p>{person.message}</p>
                    </div>
                    <div style={styles.timeSentDetails}>
                        <h6>{person.timeSent}</h6>
                        {person.noOfUnreadMessages && <p style={styles.noOfUnreadMessages}>{person.noOfUnreadMessages}</p>}
                    </div>
                </div>
            ))}
        </div>
      <Footer />
    </div>
    
  )
}

const styles = {
    container:{
        background: "url(<path-to-image>), lightgray 50% / cover no-repeat"
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    status: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userStatus: {
        position: "relative"
    },
    addIcon: {
        position: "absolute",
        bottom: "10px",
    },
    messageContainer: {
        background: "grey",
        padding: "20px",
        borderTopRightRadius: "60px",
        borderTopLeftRadius: "60px",
        marginTop: "20px",
        position: "relative"
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
    messageDash: {
        position: "absolute",
        top: "10px",
        height: "3px",
        width: "35px",
        background: "green",
        left: "50%",
        margin: "auto",
        transform: "translateX(-50%)"
    },
    greenDot:{
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        position: "absolute",
        bottom: 0,
        right: 0,
        background: "green"
    },
    messageDetails: {
        display: "flex",
        flexDirection: "column",
    },
    timeSentDetails: {
        marginLeft: "auto"
    },
    noOfUnreadMessages:{
        background: "green",
        padding: "10px",
        borderRadius: "50%",
        height: "20px",
        width: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}
export default Home