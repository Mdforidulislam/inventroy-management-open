import Container from "../../../ShareComponent/Container/Container";
import SectionTitle from "../../../ShareComponent/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { DatePicker } from "keep-react";
import { Button } from "@material-tailwind/react";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { Helmet } from "react-helmet";

const OffersAndCoupon = () => {
  const axiouPublice = useAxiosPublice()
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [days,setDays] = useState(null)
  const [hours,setHours] = useState(null)
  const [minutes,setMinutes] = useState(null)


  const handleDateTime = async () =>{
  
    const format = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      
      const sartDate = format(date1);
      const endigDate = format(date2);
      console.log(sartDate,endigDate);
  
    const dateInfo = {sartDate,endigDate};
     
    const insertDateCoupon = await axiouPublice.post('/coupondate',dateInfo)
    console.log(insertDateCoupon);

  }


  useEffect(() =>{
    const getCouponefferTime = async() =>{
        const getTime = await axiouPublice.get('/getofferTime')
        console.log(getTime);
        const timeToSecend = getTime?.data?.timeDifference[0]?.timeDifference
        console.log('time to secend',timeToSecend);
        const days = Math.floor(timeToSecend / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeToSecend % (1000 * 60 * 60 * 24))/ (1000 * 60 * 60));
        const minutes = Math.floor((timeToSecend % ( 1000 * 60 * 60 )) / (1000 * 60 ));
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
    }
    getCouponefferTime()
  },[])

console.log(days,hours,minutes);

  return (
    <div>
      <Container>
        <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || offers page </title>
            </Helmet>
          <SectionTitle
            title="add Coupon Date Here"
            description="Make sales with coupoon discount offer and bosst your sales"
          ></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between  text-center mt-8 gap-8  ">
          <div className="bg-green-600 h-[200px] items-center flex justify-center rounded-md text-5xl ">
            <h1 className="text-white">Day {days}</h1>
          </div>
          <div className="bg-yellow-600 h-[200px] items-center flex justify-center rounded-md text-5xl">
            <h1 className="text-white">Hours {hours}</h1>
          </div>
          <div className="bg-blue-500 h-[200px] items-center flex justify-center rounded-md text-5xl">
            <h1 className="text-white">Minute {minutes}</h1>
          </div>
        </div>
        <div>
            <div className="flex gap-8 mt-10">
              <DatePicker singleDatePicker={setDate1} >
                <DatePicker.SingleDate />
              </DatePicker>
              <DatePicker singleDatePicker={setDate2} >
                <DatePicker.SingleDate  />
              </DatePicker>
           </div>
          <div className=" mt-10 flex justify-center">
              <Button onClick={handleDateTime} >Set Discount Offers</Button>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default OffersAndCoupon;
