import { Button, Textarea } from "@material-tailwind/react";
import Container from "../../../ShareComponent/Container/Container";
import SectionTitle from "../../../ShareComponent/SectionTitle/SectionTitle";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import useProduct from "../../../Hooks/useProduct";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";




const ProductUpdate = () => {

  const {id} = useParams()
  const axiosPublice = useAxiosPublice()
  const {isPending, error, data, refetch} = useProduct()
  console.log(data);

  const updateData = data?.data?.find(item => item._id === id)
  console.log(updateData);


  const hanldeupdateProduct =  (event) =>{
    
        event.preventDefault()
        const form = event.target;
        const productName = form.name.value;
        const productLocation = form.Location.value;
        const productCategory = form.category.value;
        const productQuantiy = form.Quantity.value;
        const productCost = form.Cost.value;
        const productProfit = form.profit.value;
        const productDescription = form.description.value;
        const photoImage = form.img.value;
        const productDiscount = form.discount.value;

        const productInfo = {
            productName , productLocation , productCategory , productQuantiy , productCost , productProfit , productDescription , photoImage ,productDiscount
        }
        const updateDate = axiosPublice.put(`/updateproduct/${id}`,productInfo)
        if (updateDate) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your product update succesfully",
                showConfirmButton: false,
                timer: 1500
              });
        }

        
  }



    return (
        <Container>
        <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || product upload </title>
            </Helmet>
           <div className='py-10'><SectionTitle title='Product Added Here' description='added more product here and bost your sales on shop'></SectionTitle></div>
           <div className="border p-10 rounded-md shadow-sm w-full">
         <form  onSubmit={hanldeupdateProduct} className="w-full">
           <div className="grid grid-cols-2 gap-10 w-full  ">
             <div className=" w-full col-span-2 md:col-span-1 ">
               <label htmlFor="" className="block">
                 Product Name
               </label>
               <input
                 type="text"
                 name="Name"
                 defaultValue={updateData?.productName}
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
                 defaultValue={updateData?.productLocation}
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
                 defaultValue={updateData?.productCategory}
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
                 defaultValue={updateData?.productQuantiy}
                 placeholder="Product Quantity"
                 className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
               />
             </div>
             <div className="w-full col-span-2 md:col-span-1">
               <label htmlFor="" className="block">
               Buying Price
               </label>
               <input
                 type="number"
                 name="Cost"
                 defaultValue={updateData?.cost}
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
                  defaultValue={updateData?.photoImage}
                  placeholder="Product Name"
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
                  defaultValue={updateData?.productDiscount}
                  placeholder="Product Discount"
                  className="w-full p-3 border shadow-sm rounded-full mt-3 px-6"
                />
            </div>

             <div className="col-span-2">
               <label htmlFor="" className="block">
               Product Description
               </label>
               <div className="flex w-full flex-col gap-6">
                 <Textarea name="description" defaultValue={updateData?.productDescription} variant="outlined" label="Outlined" />
               </div>
             </div>

             <div className=" col-span-2">
                 <Button type="submit" className="" fullWidth>Update Product</Button>
             </div>
           </div>
         </form>
       </div>
       </div>
      </Container>
    );
};

export default ProductUpdate;