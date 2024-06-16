import { useEffect, useRef, useState } from "react";
import { MicroPhone, Send, Trash } from "./Svg"
import { UploadFile } from "../utils/User";



const Record = () => {

    const [stream, setStream] = useState(null);
    const mimeType = "audio/webm";
    const mediaRecorder = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);


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
        // UploadFile(audio)
        // const data = {
        //     uid1: myUID,
        //     uid2: id,
        //     senderUID: myUID,
        //     type: 'audio',
        //     content: '',
        //     url: '',
        //     timestamp: serverTimestamp()
        // }
  
        // const res = await SendData('messages', data);
    }
    const handleDelete = () => {
        setAudio(null)
    }
  return (
    <div style={styles.rightButtons} onClick={handleClick}>
        <div className={`cursor--pointer ${isPlaying ? "mic" : ""}`}>
            <MicroPhone />
            <audio src="gs://textit-30e31.appspot.com/blob:http:/localhost:5173/fc75ba9f-f081-4db4-a08b-b89a80081e19" controls></audio>
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

