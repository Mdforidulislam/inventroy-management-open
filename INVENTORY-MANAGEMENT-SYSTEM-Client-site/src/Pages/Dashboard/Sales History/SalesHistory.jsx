import { Button, Card, Typography } from "@material-tailwind/react";
import Container from "../../../ShareComponent/Container/Container";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Pagination } from "keep-react";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["Product Info", "Date", "Profit"];

const SalesHistory = () => {
  const [allHistoy, setAllhistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort,setSort] = useState(true)
  const axiouPublice = useAxiosSecure();
  const { userInfo } = useAuth();
  useEffect(() => {
    // const email = {email: userInfo?.email ,currentPage: currentPage , productperpage: 5 };

    const queryParams = `?email=${userInfo?.email}&currentPage=${currentPage}&productperpage=5&sortDirection=${sort}`

    const sallingHistory = async () => {
      const allhistory = await axiouPublice.get(`/saleshistory${queryParams}`);
      console.log(allhistory, "history");
      setAllhistory(allhistory);
    };
    sallingHistory();
  }, [axiouPublice,currentPage,userInfo?.email,sort]);

const hanleSorting = () =>{
    setSort(!sort)
}

  return (
    <Container>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || sales histroy </title>
            </Helmet>
      <div>
          <Button onClick={hanleSorting}>short By view</Button>
      </div>
      <div className="mt-10 ">
        <Card className="h-full w-full overflow-scroll ">
          <table className="w-full min-w-max table-auto text-left p-10">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
              {allHistoy?.data?.map(
                (
                  {
                    amount,
                    formattedDate,
                    image,
                    productName,
                    profit,
                    userEmail,
                  },
                  index
                ) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-6">
                        <div>
                          <img
                            className="w-[50px] h-[50px] rounded-full"
                            src={image}
                            alt=""
                          />
                        </div>
                        <div>
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
                            className="font-normal"
                          >
                            {userEmail}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formattedDate}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {profit}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          <div className="py-10">
          <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={3}
              iconWithText={true}
              prevNextShape="circle"
              activeCurrentPageShape="circle"
            />
          </div>
          </table>
        </Card>
      </div>
    </Container>
  );
};

export default SalesHistory;
