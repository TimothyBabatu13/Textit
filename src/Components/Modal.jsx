import poll from "../assets/Icons/poll.svg";
import location from "../assets/Icons/location.svg";
import contact from "../assets/Icons/contact.svg";
import media from "../assets/Icons/media.svg";
import remove from "../assets/Icons/remove.svg";
import doc from "../assets/Icons/doc.svg";
import camera from "../assets/Icons/camera.svg";

const Modal = ({ closeModal }) => {
    const data = [
        {
            img: camera,
            text: "Camera",
            desc: ""
        },
        {
            img: doc,
            text: "Documents",
            desc: "Share your files"
        },
        {
            img: poll,
            text: "Create a poll",
            desc: "create a poll for any query"
        },
        {
            img: media,
            text: "Media",
            desc: "Share photos and videos"
        },
        {
            img: contact,
            text: "Contact",
            desc: "Share your contacts"
        },
        {
            img: location,
            text: "Location",
            desc: "Share your location"
        },
    ]

  return (
    <section style={styles.container}>
        <div style={styles.header}>
            <img src={remove} onClick={closeModal} className="cursor--pointer" alt="remove icon" />
            {/* <p className="cursor--pointer" onClick={closeModal}></p> */}
            <h5>Share Content</h5>
            <div></div>
        </div>
        <div>
            {data.map((item, id)=><div style={styles.modalElement} className="cursor--pointer" key={id}>
                <img style={styles.modalElementImg} src={item.img} alt={`${item.text} icon`} />
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
        background: "grey",
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
    }
}
export default Modal