
import ChatHeader from "../Components/ChatHeader";
import SendMessage from "../Components/SendMessage";
import img from "../assets/images/user.png";
import ViewMessage from "../Components/ViewMessage";
import { useParams } from "react-router-dom";

const Chat = () => {
    const { id } = useParams();
   //id wiil be used to check for messages related to the specific user
    const message = [
        {
            senderId: 1,
            content: "Hello! Juan abraham",
            timeSent: "09:24 AM",
            type: "text",
        },
        {
            senderId: 2,
            content: "Hello! Nazrul How are you?",
            timeSent: "09:25 AM",
            type: "text",
            senderName: "Jhon Abraham"
        },
        {
            senderId: 1,
            content: "You did your job well!",
            timeSent: "09:25 AM",
            type: "text"
        },
        {
            senderId: 2,
            content: "Have a great working wekk!!",
            timeSent:"09:25 AM",
            type: "text",
            senderName: "Jhon Abraham"
        },
        {
            senderId: 2,
            content: "Hope you like it",
            timeSent: "09:25 AM",
            type: "text",
            senderName: "Jhon Abraham"
        },
        {
            senderId: 1,
            content: "url......",
            timeSent: "09:25 AM",
            type: "audio"
        }
    ]

    return (
    <section className="overall--container">
        <ChatHeader img={img} />
        <div style={styles.messageContainer}>
            {message.map((msg, id) =>(
                <ViewMessage key={id} data={msg} group={false} />
            ))}
        </div>
        <SendMessage id={id} />
      
    </section>
  )
}


const styles = {
    messageContainer : {
        marginTop : " 100px"
    },
}

export default Chat