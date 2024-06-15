import { useEffect, useRef, useState } from "react";
import { MicroPhone } from "./Svg"



const Record = () => {

    const [stream, setStream] = useState(null);
    const mimeType = "audio/webm";
    const mediaRecorder = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [count, setCount] = useState(0);


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
            
        mediaRecorder.current.stop();
        // mediaRecorder.current.pause()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };
    
    const handlePause = () => {
        mediaRecorder.current.pause()
    }
    useEffect(()=>{
        getMicrophonePermission()
    }, [])

    const handleResume = () => {
        mediaRecorder.current.resume()
    }

    const handleClick =  () => {
     
        if(count === 0) startRecording()
        if(count ===1) stopRecording()
        setCount(prev => prev+1);
    }
  return (
    <div style={styles.rightButtons} onClick={handleClick}>
        <div className="cursor--pointer">
            <MicroPhone />
        </div>
     
    {audio ? (
  <div style={{position: 'absolute', top: '-100px', left: '-1200%'}}>
     <audio src={audio} controls></audio>
   </div>
) : null}
    </div>
   
  )
}
const styles = {
    rightButtons : {
        display: "flex",
        alignItems: "center",
        position: 'relative'
    }
}

export default Record;

