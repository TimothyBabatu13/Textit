import GoBack from "./GoBack";
// import img from "../assets/images/user.png";
import { ChatHeaderCall, Video } from "./Svg";
const ChatHeader = ({ data }) => {

  const img = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/user.png?alt=media&token=2b34388c-9d32-44a1-bf7c-25fb110373b9";
  

    // console.log(data)
    // const {isActive, img, name} = data;

//   const isActive = true;

const handleError = (e) => {
  
}
  return (
    <header style={styles.header}>
            <GoBack />
            <div className="cursor--pointer" style={styles.userDetails}>
                <div style={styles.receipientImgContainer}>
                    <img style={{height:"50px", width:"50px", borderRadius:"50%"}} onError={handleError} src={data?.img || img} alt="reciepient image" />
                    {data?.isActive && <div style={styles.isActive}></div>}
                </div>
                <div>
                    <h3>{data?.name}</h3>
                    <h5>{data?.isActive ? "Active now": "Offline"}</h5>
                </div>
            </div>
          <div style={styles.call}>
              
              <div className="cursor--pointer">
                <ChatHeaderCall />
              </div>
              <div style={styles.video} className="cursor--pointer">
                <Video />  
              </div>
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
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
},
video: {
    marginLeft: "20px"
},
}
export default ChatHeader