import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useProduct from "../../../Hooks/useProduct";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];
 
const TABLE_HEAD = ["Product Info", "Product Quantity", "Sale Count", "Delete", "update"];
 
const ProductTable = () => {
  const axiosPublice = useAxiosSecure()
  const {isPending, error, data, refetch} = useProduct()
  console.log(data);

  const handleDelete =  (id) =>{
        console.log(id);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then( async(result) => {
          if (result.isConfirmed) {
            const deleted = await axiosPublice.delete(`/productDelete/${id}`)
            console.log(deleted);
            if (deleted) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success"
              });
              refetch()
            }

          }
        });
        
  }

    return (
        <Card className="h-full w-full p-10">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || product page </title>
            </Helmet>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className={`${data?.data.length < 1 ?'mb-8 flex items-center justify-center gap-8 ':'mb-8 flex items-center justify-between gap-8'}`}>
            <div className={`${data?.data.length < 1 ? ' hidden' : ''}`}>
              <Typography variant="h5" color="blue-gray">
                Product Number {data?.data.length}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                all product information list below 
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
             <Link to='/dashboard/productadd'>
                <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add product
                  </Button>
             </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              
              {data?.data?.map(
                ({ productQuantiy,SaleCount ,shopeName,productDescription,_id,photoImage,productName}, index) => {
                  const isLast = index === data?.data?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={index}>
                      
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          
                          <Avatar src={photoImage} alt='' size="sm" />
                          
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {productName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {shopeName}
                            </Typography>
                            
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productQuantiy}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {productDescription.slice(0,100)}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                         {SaleCount}
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          onClick={()=>handleDelete(_id)}
                        >
                          <MdDelete className="text-3xl" />
                        </Typography>
                      </td>
                      <td className={classes}>
                       
                        <Link to={`/dashboard/productupdate/${_id}`}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-6 w-6" />
                          </IconButton >
                        </Tooltip>
                        </Link>
                      </td>
                    </tr>
                  );
                },
              )}
               
            </tbody>
            <div className={`${data?.data.length < 1? '':'hidden'}`}>
              <h1 className="text-2xl font-bold">Empty product </h1>
            </div>
            
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
};

export default ProductTable;