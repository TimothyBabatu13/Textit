
const RenderHomeBackground = ({ children }) => {
  return (
    <div className="overall--container" style={styles.messageContainer}>
        <div style={styles.messageDash}></div>
        {children}
    </div>
  )
}

const styles = {
    messageContainer: {
        background: "#fff",
        padding: "20px",
        borderTopRightRadius: "60px",
        borderTopLeftRadius: "60px",
        marginTop: "20px",
        position: "relative",
        overflowY: "scroll",
        minHeight: "100px",
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