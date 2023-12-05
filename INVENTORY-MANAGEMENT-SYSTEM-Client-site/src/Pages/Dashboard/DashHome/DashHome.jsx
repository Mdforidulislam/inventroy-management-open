import { useEffect, useState } from "react";
import Container from "../../../ShareComponent/Container/Container";
import AreaCharts from "./AreaCharts";

import BarCharts from "./BarChart";
import HomCard from "./HomCard";
import PayChart from "./PayChart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const DashHome = () => {
    const axiouSecure = useAxiosSecure()
    const {userInfo} = useAuth()
    const [totalAdminIcome,setTotalAdminIcome] = useState(0)
    const email = userInfo?.email;

  useEffect(()=>{
      const analytices = async() =>{
        const totalAdminAnalytice = await axiouSecure.get(`/adminIncomeAnalytice/${email}`)
        setTotalAdminIcome(totalAdminAnalytice?.data)
        console.log(totalAdminAnalytice);
      }
      analytices()

  },[])

  // const  {isPending, error, data , refetch} = useUserShop()
  // console.log(data);
  
  const {totalProfit , totalAmount ,totalSellingPrice, massage,shopId} = totalAdminIcome ;
  
  return (
    <div className="w-full">
      <Container>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || home </title>
            </Helmet>
        <div>
          <h1 className="text-3xl font-bold text-center py-4 mb-5 capitalize">{massage}</h1>
          <h1 className="text-xl font-bold text-center py-4 mb-5 capitalize"> shop ID: {shopId}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          <HomCard amount={ parseFloat(totalProfit).toFixed(2)} title='Total Income'></HomCard>
          <HomCard amount={ parseFloat(totalAmount).toFixed(2)} title='Total Invest'></HomCard>
          <HomCard amount={ parseFloat(totalSellingPrice).toFixed(2)} title='Total selling'></HomCard>
        </div>
        <div className="py-10">
          <div className="flex-1">
            <BarCharts></BarCharts>
          </div>
        </div>
        <div className="block md:flex gap-6">
          <PayChart></PayChart>
          <AreaCharts></AreaCharts>
        </div>
      </Container>
    </div>
  );
};

export default DashHome;
