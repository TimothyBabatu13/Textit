
import ChatHeader from "../Components/ChatHeader";
import SendMessage from "../Components/SendMessage";
import img from "../assets/images/user.png";
import ViewMessage from "../Components/ViewMessage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuthProvider } from "../context/Auth";
import { FetchRealTimeUpdate } from "../utils/User";

const Chat = () => {
    const [background, setBackground] = useState(false);
    const [data, setData] = useState();
    const [messages, setMessages] = useState(null);
    const { id } = useParams();
    const { details : { myUID } } = useAuthProvider();
 

    //fetch lists of all messages exchanged between the two users.
    useEffect(()=>{
        FetchRealTimeUpdate('messages', setMessages, true);
    }, [])
    // console.log(messages);

    const msg = messages?.filter((message) => (message.uid1 === myUID && message.uid2 === id) || (message.uid1 === id && message.uid2 === myUID) )
    
  
   


    return (
    <section className="overall--container" style={{background: background ? "black" : ""}}>
        <ChatHeader data={data}/>
        <div style={styles.messageContainer}>
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
        paddingBottom: "100px",
        overflowY: "scroll",
        height: "85vh"
    },
}

export default Chat