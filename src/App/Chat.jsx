
import ChatHeader from "../Components/ChatHeader";
import SendMessage from "../Components/SendMessage";
import img from "../assets/images/user.png";
import ViewMessage from "../Components/ViewMessage";
import { useParams } from "react-router-dom";
import { useState } from "react";
import friend1 from "../assets/images/friend1.png";
import friend2 from "../assets/images/friend2.png";
import friend3 from "../assets/images/friend3.png";

const Chat = () => {
    const [background, setBackground] = useState(false)
    const { id } = useParams();
    const Message = [
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
    const [data, setData] = useState(Message[id]);
    console.log(data)
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
    <section className="overall--container" style={{background: background ? "black" : ""}}>
        <ChatHeader data={data} />
        <div style={styles.messageContainer}>
            {message.map((msg, id) =>(
                <ViewMessage key={id} data={msg} group={false} />
            ))}
        </div>
        <SendMessage handleBackground={(e) => setBackground(e)} id={id} />
      
    </section>
  )
}


const styles = {
    messageContainer : {
        marginTop : " 100px",
        paddingBottom: "100px"
    },
}

export default Chat