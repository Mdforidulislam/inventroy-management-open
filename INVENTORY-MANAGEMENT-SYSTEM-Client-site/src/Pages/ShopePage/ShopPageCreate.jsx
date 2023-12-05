
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Container from "../../ShareComponent/Container/Container";
import SectionTitle from "../../ShareComponent/SectionTitle/SectionTitle";
import { Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ShopPageCreate = () => {
  const  {userInfo} = useAuth()
  const axiosecure = useAxiosSecure()
  const navigation = useNavigate()

    const shopeMangerInfo = async(event) =>{
           event.preventDefault()
           const form = event.target;
           const shopeName = form.shopeName.value;
           const ShopOwner = form.shopeOwner.value;
           const ownerEmail = form.ownerEmail.value;
           const location = form.location.value;
           const shopLogo = form.logo.value;
           const massage = form.massage.value;
           const productLimit = 3 ;

          const  ShopeInfo = {shopeName,shopLogo,ShopOwner,ownerEmail,location,massage,productLimit}
    
          console.log(ShopeInfo);
          const createshop = await axiosecure.post('/shopcollection',ShopeInfo)
          
          console.log(createshop);
          if (createshop.data.successMassage) {
           return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${createshop?.data?.successMassage}`,
            });
          }else{
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `successfully create shop Your roll is shop manager`,
              showConfirmButton: false,
              timer: 1500
            });
          }
          
          const updateUserInfo = await axiosecure.put('/userUpdate',{userInfo: userInfo?.email ,shopeName: shopeName,userLogo:userInfo.hotoURL})
          
          console.log(updateUserInfo);
        }
        navigation('/dashboard/home')

  return (
    <Container>
      <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home || crate Shop page </title>
            </Helmet>
        <SectionTitle
          title="Add Your Shope"
          description="Please Provide more info into form and make good shop and selling more product on your shope "
        ></SectionTitle>

        <div className="border p-10 rounded-md shadow-sm w-full">
          <form onSubmit={shopeMangerInfo} className="w-full">
            <div className="grid grid-cols-2 gap-10 w-full  ">
              <div className=" w-full col-span-2 md:col-span-1 ">
                <label htmlFor="" className="block">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="shopeName"
                  placeholder="Shope Name"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                  Shop-Owner Name
                </label>
                <input
                  type="text"
                  name="shopeOwner"
                  placeholder="Shop-Owner Name"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                  Shop-Owner Email
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  placeholder="Shop-Owner Email"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                  Shop LOGO
                </label>
                <input
                  type="text"
                  name="logo"
                  placeholder="Shope logo link"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-2">
                <label htmlFor="" className="block">
                  Write Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Write Location"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="" className="block">
                  Write Description
                </label>
                <div className="flex w-full flex-col gap-6">
                  <Textarea name="massage" variant="outlined" label="Outlined" />
                </div>
              </div>

              <div className=" col-span-2">
                  <Button type="submit" className="" fullWidth>Create Shop</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ShopPageCreate;
