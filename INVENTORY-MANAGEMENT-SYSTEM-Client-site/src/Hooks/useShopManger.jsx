import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useShopManger = () => {
     const axiosSecure = useAxiosSecure()
     const {userInfo,loading} = useAuth()
     const { data: isShopManger, isLoading } = useQuery({
        queryKey: [userInfo?.email, 'shopmanager'],
        enabled: !loading && !!userInfo?.email ,
        queryFn: async () => {
            console.log('asking or checking is admin', userInfo)
            const res = await axiosSecure.get(`/users/shopmanager/${userInfo?.email}`);
            // console.log(res.data);
            console.log(res);
            return res.data?.isShopManager;
        }
    })

    return [isShopManger, isLoading ]
};

export default useShopManger;
