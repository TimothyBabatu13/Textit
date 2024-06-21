import { useEffect, useRef, useState } from "react";
import { MicroPhone, Send, Trash } from "./Svg"
import { SendData, UploadFile } from "../utils/User";
import { collection, doc, getDocs, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import app from "../Firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";



const Record = ({ myUID, id }) => {

    const [stream, setStream] = useState(null);
    const mimeType = "audio/webm";
    const mediaRecorder = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [content, setContent] = useState(null);


    const getMicrophonePermission = async () => {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setStream(streamData);
        } catch (err) {
            alert(err.message);
        }
    } 

    const startRecording = async () => {
        getMicrophonePermission()
        setIsPlaying(true)
        const media = new MediaRecorder(stream, { type: mimeType });
        mediaRecorder.current = media;
            
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setIsPlaying(false)
        mediaRecorder.current.stop();
        // mediaRecorder.current.pause()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
            
            

            const handleSave = async () => {
                const audioBlob = await fetch(audioUrl).then((r) => r.blob());
                const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });

                setAudioBlob(audioFile)
              };
              handleSave()

        };
    };

    
    // const handlePause = () => {
    //     setIsPlaying(false)
    //     mediaRecorder.current.pause()
    //     mediaRecorder.current.onpause = () => {
    //         const audioBlob = new Blob(audioChunks, { type: mimeType });
    //         const audioUrl = URL.createObjectURL(audioBlob);
    //         setAudio(audioUrl);
    //         setAudioChunks([]);
    //     };
    // }
    useEffect(()=>{
        getMicrophonePermission()
    }, [])

    const handleResume = () => {
        mediaRecorder.current.resume()
    }

    const handleClick =  () => {
     
        if(count === 0) startRecording()
        if(count ===1) stopRecording()
        setCount(prev => {
            if(prev === 2) return prev = 0
            return prev+1
        });
    }
    const handleSend = async () => {
        // console.log(audioBlob)
        
        
     
       const UploadFile = (URL) => {
  
            const storage = getStorage();
            const storageRef = ref(storage, 'images/rivers.jpg');
            
            const uploadTask = uploadBytesResumable(storageRef, URL);
            
            uploadTask.on('state_changed', 
              (snapshot) => {
            
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const data = {
                        uid1: myUID,
                        uid2: id,
                        senderUID: myUID,
                        type: 'audio',
                        content: downloadURL,
                        url: '',
                        timestamp: serverTimestamp(),
                        seen: false
                    }
                    const res = await SendData('messages', data);
                    console.log(content)

                    const checkIfDataExists = async () => {
                        const db = getFirestore(app)
                        const co = collection(db, 'msgUser')
                        console.log('gets through here')
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
                                lastMessage: downloadURL,
                                type: 'audio',
                                timestamp: serverTimestamp(),
                            })
                            return;
                        }
                        const newDoc = doc(db, "msgUser", checkIf[0].id);
                        await updateDoc(newDoc, {
                            lastMessage: downloadURL,
                            timestamp: serverTimestamp(),
                            type: 'audio'
                          });
                          console.log('done')
                          setContent(null);
                          setAudio(null)
                    }
                    checkIfDataExists()
                });
              }
            );
            }

            UploadFile(audioBlob)
        
  
        
    }

    const handleDelete = () => {
        setAudio(null)
    }
  return (
    <div style={styles.rightButtons} onClick={handleClick}>
        <div className={`cursor--pointer ${isPlaying ? "mic" : ""}`}>
            <MicroPhone />
            {/* <audio src={audio} controls></audio> */}
        </div>
     
    {audio ? (
  <div style={{position: 'fixed', bottom: '20px', left: '0', zIndex: '100', background: 'white', width: '100vw'}}>
     <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', 'alignItems': 'center'}}>
        <audio src={audio} controls></audio>
        <div className="cursor--pointer"  style={styles.fileIcons}>
            <div></div>
            <div onClick={handleDelete}><Trash /></div>
            {/* <div onClick={handleResume}><MicroPhone /></div> */}
            <div onClick={handleSend}><Send /></div>
            <div></div>
        </div>
     </div>
   </div>
) : null}
    </div>
   
  )
}
const styles = {
    rightButtons : {
        display: "flex",
        alignItems: "center",
        // position: 'relative'
    },
    fileIcons: {
        marginTop: "10px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        width: '80%'
    }
}

export default Record;

