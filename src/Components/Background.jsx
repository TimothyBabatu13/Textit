
const Background = ({ children }) => {
  //linear-gradient(271deg, rgb(67, 17, 106) 36.61%, rgb(104, 225, 253) 106.23%)
  //rgba(3, 4, 7, 0.642)
  return (
    <div style={{background: "linear-gradient(271deg, rgb(67, 17, 106) 36.61%, rgb(104, 225, 253) 106.23%)"}}>
      {children}
    </div>
  )
}

export default Background