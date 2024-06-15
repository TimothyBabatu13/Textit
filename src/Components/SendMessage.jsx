import Modal from "./Modal";

import { useState } from "react";

import {
    MicroPhone,
    Vector,
    Share,
    Send
} from "./Svg";
import { useAuthProvider } from "../context/Auth";
import { SendData } from "../utils/User";
import { collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import app from "../Firebase";
import Record from "./Record";

const SendMessage = ({ id, handleBackground }) => {
    const { details: { myUID } } = useAuthProvider();
    // console.log(id)

    const [text, setText] = useState(JSON.parse(localStorage.getItem(id))||"");
    const [openModal, setOpenModal] = useState(false);
    const [modalHeight, setModalHeight] = useState('0px');
    //set record to true at first
   
    
   
    
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
        if(text.trim() === '') return
        const data = {
            uid1: myUID,
            uid2: id,
            senderUID: myUID,
            type: 'msg',
            content: text,
            url: '',
            timestamp: serverTimestamp()
        }
  
        const res = await SendData('messages', data);
        if(res === 'successful') setText('');
        const checkIfDataExists = async () => {
            const db = getFirestore(app)
            const co = collection(db, 'msgUser')
            
            const docSnap = await getDocs(co);
            const usersList = docSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            const checkIf = usersList.filter(person => (person.user1 === myUID && person.user2 === id) || (person.user2 === myUID && person.user1 === id))
            if(checkIf.length < 1){
                const users = await SendData('msgUser', {
                    user1: myUID,
                    user2: id,
                    lastMessage: text,
                    timestamp: serverTimestamp()
                })
                return;
            }
            const newDoc = doc(db, "msgUser", checkIf[0].id);
            await updateDoc(newDoc, {
                lastMessage: text,
                timestamp: serverTimestamp()
              });
            
        }
        checkIfDataExists()
    }
    
    
  return (
      <div style={styles.sendMessageContainer}>
          <div className="cursor--pointer" onClick={handleModal}>
              <Share />
          </div>
        <div style={styles.userInput}>
              <textarea value={text} onChange={handleChange} style={{ width: "100%", padding: "10px", resize: "none", height: "40px", borderRadius: "10px" }} name="" id="" cols="30" rows="10"></textarea>
              <div className="cursor--pointer" onClick={handleSendMessage} style={styles.fileIcons}>
                  <Send />
              </div>
        </div>
          <Record />
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
        right: "15px"
    },
}

export default SendMessage