import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import Container from "../../../ShareComponent/Container/Container";
import useProduct from "../../../Hooks/useProduct";
import { SiStripe } from "react-icons/si";
import { useEffect, useState } from "react";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const TABLE_HEAD = ["Product Info", "Selling Price", "Quantity", "Discount", "Pay"];



const SalesCollection = () => {
  const [searchvalue, serSearchValue] = useState([])
  // const  axiosPublice = useAxiosPublice()
  const {isPending, error, data , refetch} = useProduct()


 let itemShow;
  if (searchvalue.length > 0) {
    itemShow = searchvalue
    
  }else{
    itemShow = data?.data
    
  }

  const handleSearch = (event) =>{
    event.preventDefault()

    const serarchValue = event.target.search.value;
    console.log(serarchValue);
    const searchData = data?.data?.filter(item => item._id === serarchValue)
    console.log(searchData);
    if (searchData){
      serSearchValue(searchData)

    }else{
      serSearchValue(null)
    }

  }

  return (
    <Container><div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || sales collection </title>
            </Helmet>
    <Card className="h-full w-full p-8 py-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Sales Collection
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last collection
            </Typography>
          </div>
            <form onSubmit={handleSearch}>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  name="search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button type="submit" className="flex items-center gap-3" size="sm">
                Search 
              </Button>
              </div>
            </form>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
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
            {itemShow && itemShow?.map(
              (
                {
                  productName,
                  photoImage,
                  productQuantiy,
                  productDiscount,
                  sellingPrice,
                  _id,
                },
                index
              ) => {
                const isLast = index === data?.data?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={photoImage}
                          alt={productName}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      <div>
                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          Name: {productName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          prodcut ID : {_id}
                        </Typography>
                      </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {sellingPrice}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {productQuantiy}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                       {productDiscount}
                      </div>
                    </td>
                    <td  className={classes}>
                      {
                        productQuantiy > 0 ? <Tooltip content="Pay Now">
                        <Link to={`/dashboard/payment/${_id}`}>
                         <IconButton variant="text">
                                 <SiStripe />
                         </IconButton>
                       </Link>
                       </Tooltip> : <Button>Stock Out</Button>
                      }
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  </div>
  </Container>
  );
};

export default SalesCollection;
