import Header from "../Components/Header";
import Background from "../Components/Background";
import RenderHomeBackground from "../Components/RenderHomeBackground";
import Footer from "../Components/Footer";
import addIcon from "../assets/Icons/plus.svg";
import user from "../assets/images/user.png";
import friend1 from "../assets/images/friend1.png";
import friend2 from "../assets/images/friend2.png";
import friend3 from "../assets/images/friend3.png";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/Auth";
import { FetchRealTimeUpdate, GetUserData } from "../utils/User";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import app from "../Firebase";
import { formatDate } from "../utils/formatDate";
import { MusicNote } from "../Components/Svg";

//user--- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/user.png?alt=media&token=2b34388c-9d32-44a1-bf7c-25fb110373b9
//adil-- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend1.png?alt=media&token=9ec0cc7b-7b82-4525-bd72-4015f4ec3357
//mariana-- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend2.png?alt=media&token=f3a0dc20-8609-42ac-9476-28c6a77ee633
//dean-- https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend3.png?alt=media&token=8dc23146-bdd6-4f51-8949-e600ba6a5deb


const Message = () => {

    const { details } = useAuthProvider()
    const [users, setUsers] = useState(null);
    const [usersList, setUsersList] = useState(null);
    const [usersInfo, setUsersInfo] = useState([]);
    const [noOfUnseenMsgs, setNoOfUnseenMsgs] = useState(null); 

    const userURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/user.png?alt=media&token=2b34388c-9d32-44a1-bf7c-25fb110373b9";
    const AdilURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend1.png?alt=media&token=9ec0cc7b-7b82-4525-bd72-4015f4ec3357";
    const marianaURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend2.png?alt=media&token=f3a0dc20-8609-42ac-9476-28c6a77ee633";
    const deanURL = "https://firebasestorage.googleapis.com/v0/b/textit-30e31.appspot.com/o/friend3.png?alt=media&token=8dc23146-bdd6-4f51-8949-e600ba6a5deb";
  
    const navigate = useNavigate();

    const usersMsgs = usersList?.filter((message) => (message.user1 === details.myUID) || (message.user2 === details.myUID) )
    // console.log(usersMsgs)
    

    const fetchData = async () => {
        // console.log(usersMsgs)
        const returnOnlyIds = usersMsgs?.map(person => person.user1 === details.myUID ? {id: person.user2, timestamp: person.timestamp, lastMessage: person.lastMessage, noOfUnreadMessages: person.noOfUnSeen, type: person.type} : {id:person.user1, timestamp: person.timestamp, lastMessage: person.lastMessage, type: person.type});
        const db = getFirestore(app);

        /* 

        const mySongs = order === true ?  query(collection(db, myCollection), orderBy("timestamp")) : collection(db, myCollection) 
    let isUnsubscribed = false;
    
    // const q = query(collection(db, "your-collection"), orderBy("timestamp"));
    const unsub = onSnapshot(mySongs, (result)=>{
        if (isUnsubscribed) return;
        const data = result.docs.map(item => item.data());
        func(data)
    })
   
    return () => {
        isUnsubscribed = true;
        unsubscribe();
    }

        */

        const data = [];
        for(let i of returnOnlyIds){
            const q = query(collection(db, "users"), where("uid", "==", i?.id));
            
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                data.push(doc.data());
                // console.log(doc.id, " => ", doc.data());

            });
        }
        return [data, returnOnlyIds];
    }
    // const realListOfIDs = [...new Set(listOfIds)];
   
    //useEffect to get number of unread messages;
    const getAllMessages = () => {

    }
    useEffect(() => {
        const returnOnlyIds = usersMsgs?.map(person => person.user1 === details.myUID ? {id: person.user2, timestamp: person.timestamp, lastMessage: person.lastMessage, noOfUnreadMessages: person.noOfUnSeen} : {id:person.user1, timestamp: person.timestamp, lastMessage: person.lastMessage});
        const onlyID = returnOnlyIds?.map(item => item.id)
        
        
        const fetchUsersMessages = ()=> {
            const db = getFirestore(app);
            const users = collection(db, 'messages') 
            let isUnsubscribed = false;
            
            const unsub = onSnapshot(users, (result)=>{
                if (isUnsubscribed) return;
                const data = result.docs.map(item => item.data());
                const arrOfFilter = [];
                for(let i = 0; i < onlyID?.length; i++){
                    const filtered = data.filter(item => onlyID[i] && item.uid1 === onlyID[i] && item.uid2 === details.myUID || onlyID[i] && item.uid2 === onlyID[i] && item.uid1 === details.myUID);
                    arrOfFilter.push(filtered)
                }

                setNoOfUnseenMsgs(arrOfFilter);
            })
        
            return () => {
                isUnsubscribed = true;
                unsubscribe();
            }
        }
        fetchUsersMessages();

    }, [usersList])

    const MapOfArray = [].concat.apply([], noOfUnseenMsgs);    

    useEffect(()=>{
        fetchData().then(res => {
            const [data, msg] = res;
   
            const newArr = [];
            // console.log(data);
            // console.log(msg)
            for(let i in data){
                for(let j in msg){
                    if(data[i].uid === msg[j].id){
                        newArr.push({
                            ...data[i],
                            ...msg[j],
                            timestamp: msg[j].timestamp.toDate()
                        })
                    }
                }
            }
            const dataNeeded = [...new Set(newArr)].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
            // console.log(dataNeeded)
            setUsersInfo(dataNeeded)
        })
    },[usersList])
    const randomURL = [AdilURL, marianaURL, deanURL];

    const getRandomNumber = () => {
        return Math.floor(Math.random() * randomURL.length);
    }

    
    useEffect(()=>{
        FetchRealTimeUpdate('msgUser', setUsersList);
    }, [])

    const handleNavigateToChat = (id) => {
        navigate(`/chat/${id}`);
    }

    useEffect(()=>{
        FetchRealTimeUpdate('users', setUsers)
    }, [])


  return (
    <Background>
        <section style={styles.container} className="overall--container">
            <Header 
                text="Home"
                  img={userURL} 
                  png
                // id={idOfDocument}
            />
            <div className="home--status" style={styles.status}>
                <div className="cursor--pointer">
                    <div style={styles.userStatus}>
                        <img width="50" height="50" src={userURL} alt="user image" />
                        <img style={styles.addIcon} src={addIcon} alt="add icon" />
                    </div>
                    <h5 style={{fontWeight:"lighter"}}>My status</h5>
                  </div>

                  {/* Status */}
                  {
                      users && users.map((friend, index) => {

                        if(friend.uid !== details.myUID) return(
                          <div style={styles.friendsStatus} onClick={()=>handleNavigateToChat(friend.uid)} className="cursor--pointer" key={index}>
                            <img style={styles.friendsStatusImg} src={friend.imgURL || randomURL[2]} alt={friend.name} />
                            <h5 style={{fontWeight:"lighter"}}>{friend.name.length > 10 ? friend.name.slice(0, 12) : friend.name}</h5>          
                          </div>
                      )})
                  }
               
            </div>
            
        </section>
        <RenderHomeBackground>
            
            {usersInfo &&  usersInfo.map((person, id) => {
                   
                    const newArrayForNumberOfMessages = MapOfArray.filter(item => {
                        return (item.uid1 === details.myUID && item.uid2 === person.uid && item.senderUID !== details.myUID || item.uid2 === details.myUID && item.uid1 === person.uid && item.senderUID !== details.myUID) && !item.seen 
                    })

                        return <div onClick={()=> {
                            handleNavigateToChat(person?.uid)
                            //handleNavigateToChat(person.recipientUid)
                        }} className="cursor--pointer list--user--message" style={styles.message} key={id}>
                            <div style={styles.messageImageContainer}>
                                <img style={styles.messageImage} src={person.img || user} alt="receipient image" />
                                {person?.isActive && <div style={styles.greenDot}></div>}
                            </div>
                            <div style={styles.messageDetails}>
                                <h4 style={styles.messageDetailsName}>{person?.name}</h4>
                                <p style={styles.messageDetailsP}>{person?.type === 'msg' ? person?.lastMessage.length < 25 ? person?.lastMessage : `${person?.lastMessage.slice(0, 19)}...` : <MusicNote />}</p>
                            </div>
                            <div style={styles.timeSentDetails}>
                                <h6 style={{fontSize: '12px'}}>{formatDate(person?.timestamp)}</h6>
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}><div></div>{newArrayForNumberOfMessages.length > 0 && <p style={styles.noOfUnreadMessages}>{newArrayForNumberOfMessages.length}</p>}</div>
                            </div>
                        </div>
                    })}
        </RenderHomeBackground>
        <Footer />
    
    </Background>
    
  )
}

const styles = {
    container:{
        // background: "url(<path-to-image>), lightgray 50% / cover no-repeat"
        // background: "linear-gradient(271deg, rgb(67, 17, 106) 36.61%, rgb(104, 225, 253) 106.23%)"
    },
    status: {
        display: "flex",
        alignItems: "center",
        overflowX: "scroll",
        color: "#fff",
    },
    userStatus: {
        position: "relative",
        marginRight: "15px",
        marginBottom: "10px"
    },
    addIcon: {
        position: "absolute",
        bottom: "7px",
        right: '0',
        height: "12px",
        width: "12px",
        background: "white",
        borderRadius: "50%"
    },
    friendsStatus: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "15px",
    },
    friendsStatusImg: {
        marginBottom: "10px",
        border: "1px solid red",
        borderRadius: "50%",
        height: "50px",
        width: "50px"
    },

    
    message: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px"
    },
    messageImageContainer:{
        position: "relative",
        marginRight: "15px",
    },
    messageImage: {
        borderRadius: "50%",
        height: "50px",
        width: "50px"
    },
    greenDot:{
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        position: "absolute",
        bottom: "8px",
        right: 0,
        background: "green"
    },
    messageDetails: {
        display: "flex",
        flexDirection: "column",
    },
    messageDetailsName: {

    },
    messageDetailsP: {
        fontWeight: "lighter",
        fontSize: "0.8em",
    },
    timeSentDetails: {
        marginLeft: "auto",
    },
    noOfUnreadMessages:{
        background: "red",
        color: "#fff",
        padding: "10px",
        borderRadius: "50%",
        height: "20px",
        width: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.6em"
    }
}
export default Message