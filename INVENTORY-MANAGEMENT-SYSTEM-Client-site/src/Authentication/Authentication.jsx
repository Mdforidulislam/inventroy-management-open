import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut ,updateProfile  } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublice from "../Hooks/useAxiosPublice";

export const AuthContext = createContext(null)
const Googleprovider = new GoogleAuthProvider();

const auths = auth;

const Authentication = ({children}) => {
    const [userInfo ,setUserInfo] = useState([])
    const [loading, setLoading] =useState(true)
    const axiouPublice = useAxiosPublice()
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auths,email,password)
    }

    const singingWithemail = (email, password) =>{
        return signInWithEmailAndPassword(auths,email, password)
    }

    const LogOutUser = () =>{
        setLoading(true)
       return signOut(auths)
    }

  
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auths,Googleprovider)
    }

    const setProfile = (curentUser,name, photo) =>{
         updateProfile(curentUser,{
            displayName: name,
            photoURL: photo
         })
         .then(result =>{
            console.log(result);
         })
         .catch(error =>console.log(error))
    }

    useEffect(()=>{
        const unsuscripbe = onAuthStateChanged(auths, (currentUser)=>{
            console.log(currentUser?.email);
            setUserInfo(currentUser)
            const createToken = async() =>{
            const tokenGenrate = await axiouPublice.post('/jwt',{
                email: currentUser?.email
            }) 
            console.log(tokenGenrate);
            localStorage.setItem('token',tokenGenrate?.data?.token)
        }
        createToken()
        setLoading(false)
    })
    

        return ()=> unsuscripbe()
    },[])


    const authInfo = {userInfo,createUser,singingWithemail,LogOutUser,googleLogin,loading,setProfile}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authentication;