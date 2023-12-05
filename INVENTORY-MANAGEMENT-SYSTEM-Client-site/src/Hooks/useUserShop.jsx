import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserShop = () => {

 const axiosPublice = useAxiosSecure()
 const {userInfo,loading} = useAuth()
    const { isPending, error, data , refetch} = useQuery({
        enabled: !loading,
        queryKey: ['userdata'],
        queryFn: async() => {
            const userInfo = await axiosPublice.get('/usersget')
            return userInfo?.data;
        }
      })

      return { isPending, error, data , refetch}
};

export default useUserShop;