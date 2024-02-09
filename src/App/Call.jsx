import Background from "../Components/Background";
import RenderHomeBackground from "../Components/RenderHomeBackground";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Call as Cal, Video } from "../Components/Svg";
import call from "../assets/Icons/Call.svg";
import video from "../assets/Icons/Video.svg";
import user1 from "../assets/images/friend1.png";
import user2 from "../assets/images/friend2.png";
import user3 from "../assets/images/friend4.png";
import user4 from "../assets/images/friend4.png";
import user5 from "../assets/images/friend5.png";


const Call = () => {
  const data = "This data is coming from call component";
  const Data = [
    {
      name: "Team Align",
      img: user1,
      time: "Today, 09:30 AM",
      type: "incoming"
    },
    {
      name: "Jhon Abraham",
      img: user2,
      time: "Today, 07:30 AM",
      type: "incoming"
    },
    {
      name: "Sabila Sayma",
      img: user1,
      time: "Yesterday, 07:35 PM",
      type: "missed"
    },
    {
      name: "Alex Linderson",
      img: user2,
      time: "Monday, 09:30 AM",
      type: "outgoing"
    },
    {
      name: "Jhon Abraham",
      img: user5,
      time: "03/07/22, 07:35 AM",
      type: "missed"
    },
    {
      name: "Jphn Borino",
      img: user1,
      time: "Monday, 09:30 AM",
      type: "outgoing"
    },{
      name: "Jhon Abraham",
      img: user2,
      time: "Today, 07:30 AM",
      type: "incoming"
    },
    {
      name: "Sabila Sayma",
      img: user1,
      time: "Yesterday, 07:35 PM",
      type: "missed"
    },
    {
      name: "Alex Linderson",
      img: user2,
      time: "Monday, 09:30 AM",
      type: "outgoing"
    },
    {
      name: "Jhon Abraham",
      img: user5,
      time: "03/07/22, 07:35 AM",
      type: "missed"
    },
    {
      name: "Jphn Borino",
      img: user1,
      time: "Monday, 09:30 AM",
      type: "outgoing"
    }
];
  return (
    <Background>
      <div className="overall--container">
        <Header 
          text="Calls"  
          img={<Cal height width />}
          data={data}
        />
      </div>
      <RenderHomeBackground height="80vh">
        <div style={{padding: "10px 0 40px 0"}}>
          <h3 style={{marginBottom: "10px"}}>Recent</h3>
          {Data.map((data, id) => {
            let img;
            if(data.type === "incoming"){
              img = call
            }else if(data.type === "outgoing"){
              img = video
            }
            else{
              img = ""
            }
            return (
              <div style={{display:"flex", alignItems: "center", marginBottom: id === Data.length-1 ? "0" : "15px" }} key={id}>
                <img style={styles.img} src={data.img} alt={`${data.name} image`} />
                <div style={styles.info}>
                  <h3>{data.name}</h3>
                  <p style={styles.time}><img src={img} style={{marginRight: "8px"}} alt={`${data.type} icon`} />{data.time}</p>
                </div>
                <div style={styles.rightImg}>
                  <div className="cursor--pointer">
                    <Cal />
                  </div>
                  <div className="cursor--pointer" style={{marginLeft: "10px"}}>
                    <Video />
                  </div>
                </div>
              </div>)
          })}
        </div>
      </RenderHomeBackground>
    
      <Footer />

    </Background>
  )
}

const styles = {
  call: {
    display:"flex",
    alignItems: "center",
  },
  img: {
    width: "50px",
    height: "50px",
    borderRadius: "50%"
  },
  info: {
    marginLeft: "25px"
  },
  time: {
    display:"flex", 
    alignItems:"center",
  },
  rightImg: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center"
  }
}
export default Call