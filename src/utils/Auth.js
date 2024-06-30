import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FormatFirebaseError } from './formatFirebaseError';


export const useLogin = async (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        return {
            response: 'ok',
            uid: user.uid
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        return {
            response: '404',
            details: errorMessage
        }
    });

}

export const UseSignUp = async (auth, email, password) => {

    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return {
        response: "ok",
        uid: user.uid
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(FormatFirebaseError(errorMessage))
      return {
        response: "404",
        errorMessage
      }
      // ..
    });
}
