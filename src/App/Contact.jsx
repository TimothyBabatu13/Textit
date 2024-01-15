import Background from "../Components/Background";
import Header from "../Components/Header";
import RenderHomeBackground from "../Components/RenderHomeBackground";
import Footer from "../Components/Footer";
import conatct from "../assets/Icons/user.svg";
const Contact = () => {
  const data = "This data is coming from contact";
  const Data = [
    {
      alphabet: "A",
      list: [
        {
          name: "Akin Sabila",
          desc: "Life is beautiful",
          img: ""
        },
        {
          name: "Adil Adnan",
          desc: "Be your own hero",
          img: ""
        }
      ]  
    },
    {
      alphabet: "B",
      list: [
        {
          name: "Bristy Haque",
          desc: "Keep Working",
          img: ""
        },
        {
          name: "John Borino",
          desc: "Make yourself proud",
          img: ""
        },
        {
          name: "Borsha Akther",
          desc: "Flowers are beautiful",
          img: ""
        }
      ]  
    },
    {
      alphabet: "s",
      list: [
        {
          name: "Sheik Sadi",
          desc: "I don't know what was written here",
          img: ""
        }
      ]
    }
  ]
  console.log(Data)

  return (
    <Background>
      <div className="overall--container">
        <Header
          text="Contacts"
          img={conatct}
          data={data}
        />
      </div>
      <RenderHomeBackground>
        <h3>My Contact</h3>
        {Data.map((item, id) => {
          return (
            <div key={id}>
              <h3>{item.alphabet}</h3>
              <div>
                <img src={item?.list[id]?.img} alt="" />
                <div>
                  <h3>{item?.list[id]?.name}</h3>
                  <p>{item?.list[id]?.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
      </RenderHomeBackground>
      <Footer />
    </Background>
  )
}

export default Contact