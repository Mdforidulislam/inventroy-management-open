
import SectionTitle from '../../../ShareComponent/SectionTitle/SectionTitle';
import {  Textarea } from 'keep-react';
import { Button } from '@material-tailwind/react';
import Container from '../../../ShareComponent/Container/Container';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Form, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ProductAddForm = () => {

    const nagivation = useNavigate()
    const axiosSecure = useAxiosSecure()
    const {userInfo} = useAuth()
    const hanldeAddedProduct = async (event) =>{
        event.preventDefault()
        const form = event.target;
        const productName = form.name.value;
        const productLocation = form.Location.value;
        const productCategory = form.category.value;
        const productQuantiy = form.Quantity.value;
        const productCost = form.Cost.value;
        const productDiscount = form.discount.value;
        const productProfit = form.profit.value;
        const productDescription = form.description.value;
        const photoImage = form.img.value;

    

      
        const getUserInfo = await axiosSecure.get('/user', {
            params: {
              userEmail: userInfo.email
            }
          });

        const shopeName = getUserInfo?.data?.shopeName;
        const userEmail = getUserInfo?.data?.email;
        const cost = parseInt(productCost) 
        const tax = cost * 0.075;
        const profit = ( ( cost + tax ) / 100 ) * productProfit ;
        const sellingPrice = cost + tax + profit;
        
        const SaleCount = 0 
        const productAddedDate = new Date();
        const formattedDate = productAddedDate.toLocaleDateString('en-GB');

        console.log(sellingPrice,formattedDate);


        
        const productAddInfo = {productName, productLocation, productCategory, productQuantiy,cost,profit, SaleCount,sellingPrice , productDescription,formattedDate,shopeName,userEmail,productDiscount,photoImage};
        

        const addedproduct = await axiosSecure.post('/productAdd',productAddInfo)
        if (addedproduct.data.message === 'Your Limited has been reached') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${addedproduct.data.message}`,
              });

            nagivation('/dashboard/subsription')
        } else{
          if (addedproduct) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Your Product Added Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
        console.log(addedproduct);

    }

   

    return (
       <Container>
         <div>
            <div className='py-10'><SectionTitle title='Product Added Here' description='added more product here and bost your sales on shop'></SectionTitle></div>
            <div className="border p-10 rounded-md shadow-sm w-full">
          <form  onSubmit={hanldeAddedProduct} className="w-full">
            <div className="grid grid-cols-2 gap-10 w-full  ">
              <div className=" w-full col-span-2 md:col-span-1 ">
                <label htmlFor="" className="block">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                   Product Location
                </label>
                <input
                  type="text"
                  name="Location"
                  placeholder="Product Location"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                   Product Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Product Category"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                Product Quantity
                </label>
                <input
                  type="number"
                  name="Quantity"
                  placeholder="Product Quantity"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                Product Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  placeholder="Product Discount"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                ProductionCost
                </label>
                <input
                  type="number"
                  name="Cost"
                  placeholder="Production Cost"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="w-full col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                Profit Margin of % 
                </label>
                <input
                  type="number"
                  name="profit"
                  placeholder="Profit Margin of %"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="" className="block">
                   Image Uploading
                </label>
                <input
                  type="text"
                  name="img"
                  placeholder="Product Name"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
              </div>
    
              <div className="col-span-2">
                <label htmlFor="" className="block">
                Product Description
                </label>
                <div className="flex w-full flex-col gap-6">
                  <Textarea name="description" variant="outlined" label="Outlined" />
                </div>
              </div>

              <div className=" col-span-2">
                  <Button type="submit" className="" fullWidth>Add Product</Button>
              </div>
            </div>
          </form>
        </div>
        </div>
       </Container>
    );
};

export default ProductAddForm;