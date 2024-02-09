import Modal from "./Modal";

import { useState } from "react";

import {
    File,
    MicroPhone,
    Vector,
    Share
} from "./Svg";

const SendMessage = ({ id, handleBackground }) => {

    // console.log(id)

    const [text, setText] = useState(JSON.parse(localStorage.getItem(id))||"");
    const [openModal, setOpenModal] = useState(false);
    
   
    
    const handleChange = (e) =>{
        setText(e.target.value);
    }

    const handleModal = ()=>{
        setOpenModal(true);
        handleBackground(true)
    }
    
    const closeModal = ()=>{
        setOpenModal(false);
        handleBackground(false)
    }

    
    const handleSendMessage = async () =>{
       
    }
    
  return (
      <div style={styles.sendMessageContainer}>
          <div className="cursor--pointer" onClick={handleModal}>
              <Share />
          </div>
        <div style={styles.userInput}>
              <textarea value={text} onChange={handleChange} style={{ width: "100%", padding: "10px", resize: "none", height: "40px", borderRadius: "10px" }} name="" id="" cols="30" rows="10"></textarea>
              <div className="cursor--pointer" onClick={handleSendMessage} style={styles.fileIcons}>
                  <File />
              </div>
        </div>
          <div style={styles.rightButtons}>
              <div className="cursor--pointer">
                  <Vector />
              </div>
              <div className="cursor--pointer">
                  <MicroPhone />
              </div>
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
        background: "white",
        borderTop: "1px solid rgb(205, 209, 208)"
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