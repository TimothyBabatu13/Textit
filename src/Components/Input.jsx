
const Input = ({ type, id, name, onChange, value, labeText }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label} htmlFor={id}>{labeText}</label>
      <input 
        type={type} 
        id={id}  
        name={name}
        required
        style={styles.input}
        onChange={onChange}
        value={value}
        className="signin--input"
      />
    </div>
  )
}

const styles = {
  container:{
    marginTop: "20px"
  },
  label: {
    display: "block",
    marginBottom: "15px"
  },
  input: {
    display: "block",
    width: "100%",
    border: "none",
    borderBottom: "1px solid red",
    padding: "5px"
  },
  
}
export default Input