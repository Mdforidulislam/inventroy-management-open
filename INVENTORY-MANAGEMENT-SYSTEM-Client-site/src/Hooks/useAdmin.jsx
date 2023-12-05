import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
     const axiosSecure = useAxiosSecure()
     const {userInfo,loading} = useAuth()
     const { data: isAdmin , isLoading: loadinAdmin } = useQuery({
        queryKey: [userInfo?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is admin', userInfo)
            const res = await axiosSecure.get(`/users/admin/${userInfo?.email}`);
            console.log('use admin',res);
            return res.data?.isAdmin;
        }
    })

    return [isAdmin,loadinAdmin]
};

export default useAdmin;