import message from "../assets/Icons/Message.svg";
import call from "../assets/Icons/Call.svg";
import conatct from "../assets/Icons/user.svg";
import setting from "../assets/Icons/settings.svg"
import FooterImage from "./FooterImage";
const Footer = () => {
    const data = [
        {
            img: message,
            text: "Message"
        },
        {
            img: call,
            text: "Calls"
        },
        {
            img: conatct,
            text: "Contacts"
        },
        {
            img: setting,
            text: "Settings"
        }
    ]
  return (
    <footer style={styles.footer}>
        {data.map((item, id) =>(
            <FooterImage
                key={id}
                img={item.img}
                text={item.text}
            />
        ))}
    </footer>
  )
}

const styles = {
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "white",
        padding: "10px 20px",
        zIndex: 100
    }
}
export default Footer