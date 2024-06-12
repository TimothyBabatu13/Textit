
import ChatHeader from "../Components/ChatHeader";
import SendMessage from "../Components/SendMessage";
import img from "../assets/images/user.png";
import ViewMessage from "../Components/ViewMessage";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAuthProvider } from "../context/Auth";
import { FetchRealTimeUpdate } from "../utils/User";

const Chat = () => {
    const [background, setBackground] = useState(false);
    const [data, setData] = useState();
    const [messages, setMessages] = useState(null);
    const [number, setNumber] = useState(0);
    const reff = useRef(null);
    const { id } = useParams();
    const { details : { myUID } } = useAuthProvider();
 

    //fetch lists of all messages exchanged between the two users.
    useEffect(()=>{
        FetchRealTimeUpdate('messages', setMessages, true);
    }, [])
    


    useEffect(()=>{
        const messagesLength = messages?.length;
        setNumber(prev => prev + 1);
        if(number > 1 && (messages[messagesLength - 1].senderUID === id)) return
        return reff.current.scrollTo(0, reff.current.scrollHeight);
      }, [messages])
    // console.log(messages);

    const msg = messages?.filter((message) => (message.uid1 === myUID && message.uid2 === id) || (message.uid1 === id && message.uid2 === myUID) )
    
  
   


    return (
    <section className="overall--container" style={{background: background ? "black" : ""}}>
        <ChatHeader data={data} receipientUID={id}/>
        <div ref={reff} style={styles.messageContainer}>
            {msg && msg.map((message, id) =>(
                <ViewMessage key={id} data={message} group={false} />
            ))}
        </div>
        <SendMessage handleBackground={(e) => setBackground(e)} id={id} />
      
    </section>
  )
}


const styles = {
    messageContainer : {
        marginTop : " 100px",
        paddingBottom: "120px",
        overflowY: "scroll",
        height: "85vh"
    },
}

export default Chat