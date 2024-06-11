import { addDoc, collection, getFirestore, doc, onSnapshot, query, orderBy } from "firebase/firestore"
import app from "../Firebase"
export const SendMessage = () => {

}

export const FetchData = () => {
    
}

export const FetchRealTimeUpdate = (myCollection, func, order = null) => {
    const db = getFirestore(app)
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

}

export const SendData = async (myCollection, data) => {
    const db = getFirestore(app)
    const docRef = await addDoc(collection(db, myCollection), data);
    if(docRef.id){
        return 'successful'
    }
}