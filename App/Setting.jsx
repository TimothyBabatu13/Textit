import Background from "../Components/Background";
import Header from "../Components/Header";
import RenderHomeBackground from "../Components/RenderHomeBackground";
import Footer from "../Components/Footer";
import setting from "../assets/Icons/settings.svg";
const Setting = () => {
  const data = "This data is comming from setting"
  return (
    <Background>
      <div className="overall--container">
        <Header 
          text="Settings"
          img={setting}
          data={data}
        />
      </div>
      <RenderHomeBackground> 

      </RenderHomeBackground>
      <Footer/>
    </Background>
  )
}

export default Setting