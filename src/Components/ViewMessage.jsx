import { useEffect, useRef, useState } from "react";
import { useAuthProvider } from "../context/Auth";
import { updateDocument } from "../utils/User";

const ViewMessage = ({ data, group }) => {
    
    const { details: { myUID } } = useAuthProvider();
    const [ inView, setInview ] = useState(false)
    const [count, setCount] = useState(0);
    //utilize the count to track if the image should be loaded or not.
    //this will make it not to download too much resources in the 
    //background
    const ref = useRef(null);
    
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting ){
          setInview(true);
          setCount(prev => prev + 1)
        }
      });
    };

  
    const updateIfMessageIsSeen = () => {
          // if(!inView || data?.seen || myUID === data?.senderUID) return
      if(!inView || data.seen || myUID === data.senderUID ) return
      console.log('viewing...')
      updateDocument(inView, data?.id)
    }

    useEffect(()=>{
      let observer = new IntersectionObserver(callback);
      if(ref?.current) observer.observe(ref.current);
      return ()=> {
        observer.disconnect()
      }
    }, [])

    useEffect(()=> {
      updateIfMessageIsSeen();
    }, [inView, data])

    const msg = data;
    // console.log(msg)
   if(msg?.senderUID === myUID) return(
      <div ref={ref} style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '20%'}}></div>
        <div style={{width: "fit-content"}}> 
          <div style={{display: "flex", alignItems:"center", marginBottom: "10px"}}>
            <img style={{marginRight:"10px", height: "30px", width: "30px", borderRadius: "50%"}} src={msg?.senderImg} alt=""/>
            <div style={{fontWeight:"lighter", fontSize:"0.8em"}}>{msg?.senderName}</div>
            </div>
            {msg?.type === "msg" && <p className="message--content" style={{background:"#3D4A7A", color: "#FFFFFF", fontWeight: '400', padding: "10px", borderRadius:"10px 0 10px 10px ",width: "fit-content"}}>{msg?.content}</p> }
            {msg?.type === "audio" && count > 0 && <audio style={{background:"#3D4A7A", color:"transparent", padding: "10px", borderRadius:  "10px 0 10px 10px "  }} src={msg?.content} controls></audio>}
            {msg?.type === "image" && <img style={{borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px"}} src={msg?.content} alt={msg?.content} />}
            <p style={{marginLeft: "auto", width: "fit-content"}}>{msg?.timeSent}</p>
            </div>
          </div>
   )
  return (
    <div style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
        <div style={{width: '20%'}}></div>
        <div style={{width: "fit-content"}}> 
          <div style={{display: "flex", alignItems:"center", marginBottom: "10px"}}>
            <img style={{marginRight:"10px", height: "30px", width: "30px", borderRadius: "50%"}} src={msg?.senderImg} alt=""/>
            <div style={{fontWeight:"lighter", fontSize:"0.8em"}}>{msg?.senderName}</div>
            </div>
            {msg?.type === "msg" && <p className="message--content" style={{background:  "#F2F7FB", color: '#000E08', fontWeight:'400', padding: "10px", borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px",width: "fit-content"}}>{msg?.content}</p> }
            {msg?.type === "audio" && <audio style={{background:"#3D4A7A", padding: "10px", borderRadius:  "0 10px 10px 10px", }} src={msg?.content} controls></audio>}
            {msg?.type === "image" && <img style={{borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} alt={msg?.content} />}
            <p style={{marginLeft: "auto", width: "fit-content"}}>{msg?.timeSent}</p>
            </div>
            </div>
    // <div className={msg?.senderUID === myUID ? 'my--message' : 'other--message'} style={{width: "fit-content", marginLeft: msg?.senderUID === myUID ? "auto": "0"}}> 
    //     <div style={{display: "flex", alignItems:"center", marginBottom: "10px"}}>
    //       <img style={{marginRight:"10px", height: "30px", width: "30px", borderRadius: "50%"}} src={msg?.senderImg} alt=""/>
    //       <div style={{fontWeight:"lighter", fontSize:"0.8em"}}>{msg?.senderName}</div>
    //     </div>
    //     {msg?.type === "msg" && <p className="message--content" style={{background: msg?.senderId === myUID ? "blue" : "grey", padding: "10px", borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px",width: "fit-content"}}>{msg?.content}</p> }
    //     {msg?.type === "audio" && <audio style={{background: msg?.senderId === myUID ? "blue" : "grey", padding: "10px", borderRadius: msg?.senderId === myId ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} controls></audio>}
    //     {msg?.type === "image" && <img style={{borderRadius: msg?.senderId === myUID ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} alt={msg?.content} />}
    //     <p style={{marginLeft: "auto", width: "fit-content"}}>{msg?.timeSent}</p>
    // </div>
  )
}

export default ViewMessage