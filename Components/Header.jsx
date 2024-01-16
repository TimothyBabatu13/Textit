import search from "../assets/Icons/Search.svg";
const Header = ({  text, img, data }) => {

  const handleFilter = ()=>{
    console.log(data)
  }
  return (
    <header style={styles.header}>
        <img className="cursor--pointer" onClick={handleFilter} style={styles.searchIcon} height="20" width="20" src={search} alt="search icon" />
        <h4 style={{fontWeight:"300"}}>{text}</h4>
        <img className="cursor--pointer" height="50" width="50" src={img} alt="user image" />
    </header>
  )
}

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        color: "#fff"
    },
    searchIcon: {
        background: "red",
        padding: "4px",
        width: "30px",
        height: "30px",
        borderRadius: "50%"
    },
}
export default Header