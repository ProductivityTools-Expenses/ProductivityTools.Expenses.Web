import { initializeApp } from "firebase/app";

// import * as apiService from "services/apiService";



import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBSS0c0dZdsRVLWxFEfDTEZFkrTRFkARo",
    authDomain: "ptexpensesprod.firebaseapp.com",
    projectId: "ptexpensesprod",
    storageBucket: "ptexpensesprod.appspot.com",
    messagingSenderId: "818506204541",
    appId: "1:818506204541:web:2c422da5b4f56fcff8f814"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const isJwtExpired = require('jwt-check-expiration');

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log("token");
        console.log(res);
        console.log(await res.user.getIdToken());
        localStorage.setItem("token",await res.user.getIdToken());     
        
        const user = auth.currentUser;
       // const token=await user.getIdToken(true);

        return res.user;
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

const logout = () => {
    signOut(auth);
    console.log("singOut performed")
    localStorage.removeItem("token")
};

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

const tokenExpired = () => {
    let token = localStorage.getItem('token');
    if (token) {
        let result = isJwtExpired(token)
        return result;
    }
    else {
        return true;
    }
}

export {
    auth,
    signInWithGoogle,
    logout,
    getToken,
    tokenExpired
};