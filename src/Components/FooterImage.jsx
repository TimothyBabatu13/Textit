
const FooterImage = ({ img, text }) => {
  return (
    <div style={styles.container} className="cursor--pointer">
        <img 
          src={img} 
          alt={`${text} icon`} 
        />
        {text && <h6>{text}</h6>}
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