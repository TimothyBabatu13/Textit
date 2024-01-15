import messageActive from "../assets/Icons/Message.svg";
import call from "../assets/Icons/Call.svg";
import conatct from "../assets/Icons/user.svg";
import setting from "../assets/Icons/settings.svg";
import activeMessage from "../assets/Icons/activeMessage.svg";
import activeCall from "../assets/Icons/activeCall.svg";
import activeSetting from "../assets/Icons/activeSettings.svg";
import activeContact from "../assets/Icons/activeUser.svg";
import FooterImage from "./FooterImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {

    const location = window.location.pathname.split("/")[1] 

    const [isActive, setIsActive] = useState(location);
    const navigate = useNavigate();

    const handleActive = (e)=>{
        setIsActive(e);
    
        navigate(`/${e}`);
    }

    const data = [
        {
            activeImg: messageActive,
            text: "Message",
            img: activeMessage
        },
        {
            img: call,
            text: "Calls",
            activeImg: activeCall
        },
        {
            img: conatct,
            text: "Contacts",
            activeImg: activeContact
        },
        {
            img: setting,
            text: "Settings",
            activeImg: activeSetting
        }
    ]

  return (
    <footer style={styles.footer}>
        {data.map((item, id) =>(
            <FooterImage
                key={id}
                img={isActive === item.text.toLowerCase() ? item.activeImg : item.img}
                text={item.text}
                onClick={()=>handleActive(item.text.toLowerCase())}
                isLight={isActive === item.text.toLowerCase() ? false : true}
            />
        ))}
    </footer>
  )
}
//active color: #3D4A7A
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