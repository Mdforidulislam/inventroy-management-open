import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useShopeInfo = () => {
   const axiouPublice = useAxiosSecure()
   const {userInfo} = useAuth()

   const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () =>{
          
        const shopData = await axiouPublice.get('/shopeInfo',{
            params: {
                userEmail: userInfo.email
              }
        })

        return shopData;
    } 
  })
  return {isPending, error, data}
};

export default useShopeInfo;