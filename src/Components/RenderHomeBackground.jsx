
const RenderHomeBackground = ({ children, height}) => {
  return (
    <div className="overall--container render--home--background" style={{...styles.messageContainer, height: height || "60vh"}}>
        <div style={styles.messageDash}></div>
        {children}
    </div>
  )
}

const styles = {
    messageContainer: {
        background: "#fff",
        padding: "20px 20px 20px 20px",
        borderTopRightRadius: "60px",
        borderTopLeftRadius: "60px",
        marginTop: "20px",
        position: "relative",
        overflowY: "scroll",
        // height: "100vh",
        // height: "60vh",
        color: "#000",
    },
    messageDash: {
        position: "absolute",
        top: "10px",
        height: "3px",
        width: "35px",
        background: "rgb(205, 209, 208)",
        left: "50%",
        margin: "auto",
        transform: "translateX(-50%)"
    },
}

export default RenderHomeBackground