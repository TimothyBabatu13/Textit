import messageActive from "../assets/Icons/Message.svg";
import call from "../assets/Icons/Call.svg";
import conatct from "../assets/Icons/user.svg";
import setting from "../assets/Icons/settings.svg"
import FooterImage from "./FooterImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {

    const [active, isActive] = useState("message");
    const navigate = useNavigate();

    const handleActive = (e)=>{
        isActive(e);
        navigate(`/${e}`);
    }

    const data = [
        {
            activeImg: messageActive,
            text: "Message",
            img: messageActive
        },
        {
            img: call,
            text: "Calls",
            activeImg: ""
        },
        {
            img: conatct,
            text: "Contacts",
            activeImg: ""
        },
        {
            img: setting,
            text: "Settings",
            activeImg: ""
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
                active={active}
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