
const FooterImage = ({ img, text, onClick, isLight, children }) => {

  return (
    <div onClick={onClick} style={styles.container} className="cursor--pointer">
        {/* <img 
          src={img} 
          alt={`${text} icon`} 
      /> */}
      {children}
        {text && <h6 style={{fontWeight: isLight ? "lighter" : "bolder"}}>{text}</h6>}
    </div>
  )
}

const styles = {
  container : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}
export default FooterImage