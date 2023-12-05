import { Button } from "@material-tailwind/react";
import Container from "../../../ShareComponent/Container/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const ShopAccess = () => {
    const {userInfo} = useAuth()
    const axiousSecure = useAxiosSecure()
    const hanleShopAcces = async(event)=>{
        event.preventDefault()
        const shopId = event.target.id.value;
        const subEmail = event.target.email.value;
        console.log(shopId);
        const shopAccessInfo = {email:userInfo?.email,shopId:shopId,subEmail:subEmail }
        const udpateShopManger = await  axiousSecure.post('/shopAccess',{shopAccessInfo})   
        console.log(udpateShopManger);
    }
    return (
        <Container>
        <div >
            <div className=" bg-[#03A9F4] p-10 rounded-md text-center font-bold text-white text-3xl">
              <h1>Provide Shop Access for Your Shop</h1>
            </div>
            <form onSubmit={hanleShopAcces} className="flex justify-center items-center h-[60vh] border mt-2 rounded-lg" action=''>
                <div className="w-2/4">
                    <label htmlFor="" className="block text-center font-bold text-xl w-full">Prove ShopId</label>
                    <input name="id" className=" border p-3 mt-3 rounded-lg w-full flex justify-center" type="text" placeholder="provide your shop id" />
                    <input name="email" className=" border p-3 mt-3 rounded-lg w-full flex justify-center" type="email" placeholder="provide your access email" />
                <Button className=" mt-2 flex justify-center w-full" type="submit"> Submit </Button>
                </div>
            </form>
        </div>
        </Container>

    );
};

export default ShopAccess;