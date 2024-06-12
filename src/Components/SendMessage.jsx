import Modal from "./Modal";

import { useState } from "react";

import {
    File,
    MicroPhone,
    Vector,
    Share
} from "./Svg";
import { useAuthProvider } from "../context/Auth";
import { SendData } from "../utils/User";
import { FieldValue, Timestamp, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ id, handleBackground }) => {
    const { details: { myUID } } = useAuthProvider();
    // console.log(id)

    const [text, setText] = useState(JSON.parse(localStorage.getItem(id))||"");
    const [openModal, setOpenModal] = useState(false);
    const [modalHeight, setModalHeight] = useState('0px');
    
   
    
    const handleChange = (e) =>{
        setText(e.target.value);
    }

    const handleModal = ()=>{
        setOpenModal(true);
        setModalHeight('auto');
        handleBackground(true)
    }
    
    const closeModal = ()=>{
        setOpenModal(false);
        setModalHeight('0px');
        handleBackground(false)
    }

    
    const handleSendMessage = async () =>{
        if(!text) return
        const data = {
            uid1: myUID,
            uid2: id,
            senderUID: myUID,
            type: 'msg',
            content: text,
            url: '',
            timestamp: serverTimestamp()
        }
        // console.log(data)
        const res = await SendData('messages', data);
        if(res === 'successful') setText('');
        const users = await SendData('msgUser', {
            user1: myUID,
            user2: id
        })
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
        {openModal && <Modal height={modalHeight} closeModal={closeModal} />}
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