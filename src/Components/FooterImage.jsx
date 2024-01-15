
const FooterImage = ({ img, text, onClick, isLight }) => {

  return (
    <div onClick={onClick} style={styles.container} className="cursor--pointer">
        <img 
          src={img} 
          alt={`${text} icon`} 
        />
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