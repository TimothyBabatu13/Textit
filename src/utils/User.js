import { addDoc, collection, getFirestore, doc, onSnapshot, query, orderBy, where, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
        const data = result.docs.map(item => ({...item.data(), id: item.id}));
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

export const GetUserData = async (userId, func) => {
    const db = getFirestore(app);
    const users = query(collection(db, 'users'), where("uid", '==', userId)) 
    let isUnsubscribed = false;
    
    // const q = query(collection(db, "your-collection"), orderBy("timestamp"));
    const unsub = onSnapshot(users, (result)=>{
        if (isUnsubscribed) return;
        const data = result.docs.map(item => item.data());
        func(data[0])
    })
   
    return () => {
        isUnsubscribed = true;
        unsubscribe();
    }
}

//to get number of unread messages
/* 
query db and check if senderUID is not equal to userUID.
Them check for the number of notSeen messages. 
*/



// export const UploadFile = (URL) => {
//     const storage = getStorage();
//     console.log(URL)
//     const storageRef = ref(storage, URL);
//     console.log(URL)
//     uploadBytes(storageRef, URL).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//         console.log(snapshot)
//       })

// }

export const UploadFile = (URL, callback) => {
  
const storage = getStorage();
const storageRef = ref(storage, 'images/rivers.jpg');

const uploadTask = uploadBytesResumable(storageRef, URL);

uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      callback(downloadURL)
    });
  }
);
}


export const updateDocument = async (fieldValue, docId) => {
  const db = getFirestore(app)
  const docRef = doc(db, 'messages', docId);
  await updateDoc(docRef, {
    seen: fieldValue
  });
  console.log('updated')
}