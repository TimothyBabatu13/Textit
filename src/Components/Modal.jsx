import {
    Poll,
    Location,
    Contact,
    Media,
    Cancel,
    Document,
    Camera
} from "./Svg";

const Modal = ({ closeModal }) => {
    
    
        const getLocation = async () => {
            console.log("starting")
            //http://ip-api.com/json
            const api = await fetch("http://ip-api.com/json");
            const json = await api.json();
            const { country, regionName } = json
            alert(`Tada, you're from ${country}, and your state is ${regionName}`)
        }
    const data = [
        {
            img: <Camera />,
            text: "Camera",
            desc: "",
            func: true
        },
        {
            img: <Document />,
            text: "Documents",
            desc: "Share your files",
            func: true
        },
        {
            img: <Poll />,
            text: "Create a poll",
            desc: "create a poll for any query",
            func: false
        },
        {
            img: <Media />,
            text: "Media",
            desc: "Share photos and videos",
            func: true
        },
        {
            img: <Contact />,
            text: "Contact",
            desc: "Share your contacts",
            func: false
        },
        {
            img: <Location />,
            text: "Location",
            desc: "Share your location",
            func: false,
            getData: getLocation
        },
    ]

    const handleSubmit = (id, fun, func) => {
        fun && handleClick(id)
        !fun && func && func();
    }
    const handleClick = (e) => {
        const input = document.querySelector(`#id${e}`);
        input && input.click()
    }


  return (
    <section style={styles.container}>
        <div style={styles.header}>
            <div className="cursor--pointer" onClick={closeModal}>
                <Cancel />
           </div>
            <h5>Share Content</h5>
            <div></div>
        </div>
        <div>
              {data.map((item, id) => <div style={styles.modalElement} onClick={()=> handleSubmit(id, item.func, item.getData)} className="cursor--pointer" key={id}>
                  {item.func && <input id={`id${id}`} style={styles.input} type="file" />}
                  <div style={styles.modalElementImg}>
                    {item.img}
                  </div>
                <div className={id === data.length -1 ? null : "modal--element"}>
                    <h5>{item.text}</h5>
                    {item.desc && <p>{item.desc}</p>}
                </div>
            </div>)}
        </div>
    </section>
  )
}

const styles = {
    container: {
        position: "fixed",
        width: "100%",
        padding: "20px",
        bottom: "0",
        left: 0,
        background: "white",
        borderTopRightRadius: "30px",
        borderTopLeftRadius: "30px",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    modalElement: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px"
    },
    modalElementImg: {
        marginRight: "15px",
        width: "30px"
    },
    input: {
        position: "fixed",
        top: "-100px", 
    }
}
export default Modal