import axios from "axios";

 
 const axiosPublice = axios.create({
    baseURL:'https://inventory-management-system-server-roan.vercel.app'
 })
 

const useAxiosPublice = () => {
    return axiosPublice;
};

export default useAxiosPublice;