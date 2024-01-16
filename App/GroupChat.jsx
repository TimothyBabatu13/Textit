import ChatHeader from "../Components/ChatHeader";
import SendMessage from "../Components/SendMessage";
import img from "../assets/images/user.png";
import ViewMessage from "../Components/ViewMessage";
import imgMessage from "../assets/images/groupchatImage.png";
import user1 from "../assets/images/friend1.png";
import user2 from "../assets/images/friend2.png";
import user3 from "../assets/images/friend3.png";

const GroupChat = () => {
  const message = [
    {
      senderId: 2,
      content: "Have a great working week!!",
      timeSent: "09:25 AM",
      type: "text",
      senderName: "Hafizur Rahman",
      img: "",
      senderImg: user1,
    },
    {
      senderId: 3,
      content: "This is my new 3d design",
      timeSent: "09:25 AM",
      type: "text",
      senderName: "Majharul Haque",
      img: "",
      senderImg: user2,
    },
    {
      senderId: 3,
      content: imgMessage,
      timeSent: "09:25 AM",
      type: "image",
      senderName: "Majharul Haque",
      img: "",
      senderImg: user3,
    },
    {
      senderId: 4,
      content: "https://htntn",
      timeSent: "09:25 AM",
      type: "audio",
      senderName: "Annel Ellison",
      img: "",
      senderImg: user3,
    },
    {
      senderId: 1,
      content: "You did your job well",
      timeSent:"09:25 AM",
      type: "text",
      senderName: "You",
      senderImg: img,
    },
  ]
  return (
    <section className="overall--container">
        <ChatHeader img={img} />
        <div style={styles.messageContainer} >
          {message.map((msg, id) => (
          <ViewMessage key={id} data={msg} group/>
          ))}        
        </div>
        <SendMessage />
    </section>
  )
}

const styles = {
  messageContainer : {
      marginTop : " 100px"
  },
}

export default GroupChat