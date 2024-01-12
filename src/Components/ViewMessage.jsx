

const ViewMessage = ({ data }) => {
    const msg = data;
    const myId = 1;

  return (
    <div style={{width: "fit-content", marginLeft: msg?.senderId === myId ? "auto": "0"}}>
        {msg?.type === "text" && <p style={{background: msg?.senderId === myId ? "blue" : "grey", padding: "10px", borderRadius: msg?.senderId === myId ? "10px 0 10px 10px " : "0 10px 10px 10px",width: "fit-content"}}>{msg?.content}</p> }
        {msg?.type === "audio" && <audio style={{background: msg?.senderId === myId ? "blue" : "grey", padding: "10px", borderRadius: msg?.senderId === myId ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} controls></audio>}
        {msg?.type === "image" && <img style={{borderRadius: msg?.senderId === myId ? "10px 0 10px 10px " : "0 10px 10px 10px", }} src={msg?.content} alt={msg?.content} />}
        <p style={{marginLeft: "auto", width: "fit-content"}}>{msg?.timeSent}</p>
    </div>
  )
}

export default ViewMessage