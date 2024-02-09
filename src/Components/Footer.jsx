import {
    Call,
    ActiveCall,
    Message,
    ActiveMessage,
    Setting,
    ActiveSetting,
    User, ActiveUser
} from "./Svg";
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
            activeImg: <Message />,
            text: "Message",
            img: <ActiveMessage />
        },
        {
            img: <Call />,
            text: "Calls",
            activeImg: <ActiveCall />
        },
        {
            img: <User />,
            text: "Contacts",
            activeImg: <ActiveUser />
        },
        {
            img: <Setting />,
            text: "Settings",
            activeImg: <ActiveSetting />
        }
    ]

  return (
    <footer style={styles.footer}>
        {data.map((item, id) =>(
            <FooterImage
                key={id}
                // img={isActive === item.text.toLowerCase() ? item.activeImg : item.img}
                text={item.text}
                onClick={()=>handleActive(item.text.toLowerCase())}
                isLight={isActive === item.text.toLowerCase() ? false : true}
            >
        {isActive === item.text.toLowerCase() ? item.activeImg : item.img}
        {/* {item.img} */}
            </FooterImage>
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