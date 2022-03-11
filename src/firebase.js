import {initializeApp}from "firebase/app"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBx8dn3Pp2Eb8QKaknoA-yJLIqKazxPTi4",
    authDomain: "finalgame-7cc63.firebaseapp.com",
    projectId: "finalgame-7cc63",
    storageBucket: "finalgame-7cc63.appspot.com",
    messagingSenderId: "1078144959783",
    appId: "1:1078144959783:web:e0f94617e4bc548f97d502"
  };
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
}
export function login(email, password){
  return signInWithEmailAndPassword(auth, email, password)
}
export function logoff(){
  return signOut(auth)
}

export function LoggedIn(){
  return (auth.currentUser)
}

