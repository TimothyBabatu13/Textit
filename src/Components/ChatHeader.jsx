import GoBack from "./GoBack";
import call from "../assets/Icons/Call2.svg";
import video from "../assets/Icons/video.svg";

const ChatHeader = ({ data }) => {

    const {isActive, img, name} = data;

//   const isActive = true;

  return (
    <header style={styles.header}>
            <GoBack />
            <div className="cursor--pointer" style={styles.userDetails}>
                <div style={styles.receipientImgContainer}>
                    <img style={{height:"50px", width:"50px", borderRadius:"50%"}} src={img} alt="reciepient image" />
                    {isActive && <div style={styles.isActive}></div>}
                </div>
                <div>
                    <h3>{name}</h3>
                    <h5>{isActive ? "Active now": "Offline"}</h5>
                </div>
            </div>
            <div style={styles.call}>
                <img className="cursor--pointer" src={call} alt="call icon" />
                <img style={styles.video} className="cursor--pointer" src={video} alt="video icon" />
            </div>
        </header>
  )
}

const commonStyles = {
  display: "flex",
  alignItems: "center"
}

const styles = {
  header : {
    ...commonStyles,
    position: "fixed",
    width: "100%",
    padding: "10px",
    left: 0,
    top: 0,
    background: "#fff"
},
userDetails : {
    ...commonStyles,
    marginLeft: "10px"
},
receipientImgContainer: {
    marginRight: "10px",
    position: "relative",
},
isActive: {
    height: "10px",
    width: "10px",
    background: "green",
    borderRadius: "50%",
    position: "absolute",
    right: "2px",
    bottom: "7px"
},
call: {
    marginLeft: "auto"
},
video: {
    marginLeft: "20px"
},
}
export default ChatHeader