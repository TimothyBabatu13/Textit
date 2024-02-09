import Background from "../Components/Background";
import Header from "../Components/Header";
import RenderHomeBackground from "../Components/RenderHomeBackground";
import Footer from "../Components/Footer";
import { Setting as Set } from "../Components/Svg";

const Setting = () => {
  const data = "This data is comming from setting"
  return (
    <Background>
      <div className="overall--container">
        <Header 
          text="Settings"
          img={<Set width height/>}
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