import files from "../assets/Icons/files.svg";
import microphone from "../assets/Icons/microphone.svg";
import vector from "../assets/Icons/Vector.svg";
import share from "../assets/Icons/share.svg";
import Modal from "./Modal";
import { useEffect, useState } from "react";
const SendMessage = ({ id }) => {

    const [text, setText] = useState(JSON.parse(localStorage.getItem(id))||"");
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        localStorage.setItem(id, JSON.stringify(text));
    },[text])
    

    const handleChange = (e) =>{
        setText(e.target.value);
    }

    const handleModal = ()=>{
        setOpenModal(true)
    }
    
    const closeModal = ()=>{
        setOpenModal(false)
    }

  return (
    <div style={styles.sendMessageContainer}>
        <img className="cursor--pointer" onClick={handleModal} src={share} alt="file icon" />
        <div style={styles.userInput}>
            <textarea value={text} onChange={handleChange} style={{width: "100%", padding: "10px", resize: "none", height: "40px", borderRadius: "10px"}} name="" id="" cols="30" rows="10"></textarea>
            <img className="cursor--pointer" style={styles.fileIcons} src={files} alt="" />
        </div>
        <div style={styles.rightButtons}>
            <img className="cursor--pointer" src={vector} alt="" />
            <img className="cursor--pointer" src={microphone} alt="" />
        </div>
        {openModal && <Modal closeModal={closeModal} />}
    </div>
  )
}

const styles = {
    sendMessageContainer : {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "25px 10px",
        background: "red",
    },
    userInput : {
        // flex: 2,
        display: "flex",
        alignItems: "center",
        position: "relative",
    },
    fileIcons: {
        position: "absolute",
        right: "10px"
    },
    rightButtons : {
        display: "flex",
        alignItems: "center"
    }
}

export default SendMessage