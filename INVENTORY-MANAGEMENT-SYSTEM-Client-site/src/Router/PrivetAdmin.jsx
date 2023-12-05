import { Navigate, useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Spinner } from "keep-react";
import useAdmin from "../Hooks/useAdmin";

const PrivetAdmin = ({children}) => {
  const location = useLoaderData()
   const {loading,userInfo}  = useAuth()
   const [isAdmin,isLoading] = useAdmin()
   console.log(isAdmin);
   if (loading || isLoading) {
     return <Spinner color="info" size="lg" />;
   }
   if(isAdmin ){
    return children
   }
   return <Navigate to='/'  state={{from: location}} replace></Navigate>
};

export default PrivetAdmin;

