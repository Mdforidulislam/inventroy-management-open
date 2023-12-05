import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Spinner } from "keep-react";



const PrivetUser = ({children}) => {
   const  {userInfo,loading} = useAuth()
   const location = useLocation()

   if (loading) {
    return <Spinner color="info" size="lg" />
   }
   if (userInfo) {
     return children
   }
   return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivetUser;