
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useProduct = () => {
    const axiouPublice = useAxiosSecure()
    const {userInfo} = useAuth()
    const email = userInfo.email ;
    const { isPending, error, data , refetch} = useQuery({
        queryKey: ['getdata'],
        queryFn: async () =>{
            const proudData = await axiouPublice.get(`/productget/${email}`,)
            return proudData;
        }
      })

      return {isPending, error, data,refetch}
};

export default useProduct;