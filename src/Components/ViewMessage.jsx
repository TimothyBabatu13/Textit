import { useEffect } from "react";
import { useAuthProvider } from "../context/Auth";

const ViewMessage = ({ data, group }) => {

    const { details: { myUID } } = useAuthProvider();
  
    const msg = data;
    // console.log(msg)
   
  return (
    <div style={{width: "fit-content", marginLeft: msg?.senderUID === myUID ? "auto": "0"}}> 
        <div style={{display: "flex", alignItems:"center", marginBottom: "10px"}}>
          <img style={{marginRight:"10px", height: "30px", width: "30px", borderRadius: "50%"}} src={msg?.senderImg} alt=""/>
          <div style={{fontWeight:"lighter", fontSize:"0.8em"}}>{msg?.senderName}</div>
        </div>
        {msg?.type === "msg" && <p style={{background: msg?.senderId === myUID ? "blue" : "grey", padding: "10px", borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px",width: "fit-content"}}>{msg?.content}</p> }
        {msg?.type === "audio" && <audio style={{background: msg?.senderId === myUID ? "blue" : "grey", padding: "10px", borderRadius: msg?.senderId === myId ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} controls></audio>}
        {msg?.type === "image" && <img style={{borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} alt={msg?.content} />}
        <p style={{marginLeft: "auto", width: "fit-content"}}>{msg?.timeSent}</p>
    </div>
  )
}

export default ViewMessage