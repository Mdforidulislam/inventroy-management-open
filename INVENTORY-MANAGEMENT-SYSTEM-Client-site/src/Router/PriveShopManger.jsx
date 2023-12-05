
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useShopManger from "../Hooks/useShopManger";
import { Spinner } from "keep-react";
import useAdmin from "../Hooks/useAdmin";

const PriveShopManger = ({children}) => {
    const location = useLocation()
   const {loading,userInfo}  = useAuth()
   const [isShopManger,isLoading] = useShopManger()
   const [isAdmin , loadinAdmin ] = useAdmin()
   console.log(isShopManger);
   console.log(isAdmin);
   if ( loading || isLoading ||loadinAdmin ) {
     return <Spinner color="info" size="lg" />;
   }
   
   if(isShopManger || isAdmin){
    return children
   }
   return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default PriveShopManger;