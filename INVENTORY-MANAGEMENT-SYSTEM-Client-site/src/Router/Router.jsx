import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ShopPageCreate from "../Pages/ShopePage/ShopPageCreate";
import DemoVideo from "../Pages/WatchDemoVideo/DemoVideo";
import Dashboard from "../Root/Dashboard/Dashboard";
import DashHome from "../Pages/Dashboard/DashHome/DashHome";
import ProductMangement from "../Pages/Dashboard/Product Mangement/ProductMangement";
import SlesSummary from "../Pages/Dashboard/Sales Summer/SlesSummary";
import Suscription from "../Pages/Dashboard/Subscription Payment/Suscription";
import SalesCollection from "../Pages/Dashboard/SalesCollection/SalesCollection";
import SalesHistory from "../Pages/Dashboard/Sales History/SalesHistory";
import Users from "../Pages/Dashboard/Users/Users";
import MangeShop from "../Pages/Dashboard/MangeShop/MangeShop";
import OffersAndCoupon from "../Pages/Dashboard/Offers and Coupon/OffersAndCoupon";
import ProductAddForm from "../Pages/Dashboard/Product Mangement/ProductAddForm";
import ProductUpdate from "../Pages/Dashboard/Product Mangement/ProductUpdate";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Paymentsus from "../Pages/Dashboard/Subscription Payment/Paymentsus";
import PrivetUser from "./PrivetUser";
import PriveShopManger from "./PriveShopManger";
import PrivetAdmin from "./PrivetAdmin";
import ShopAccess from "../Pages/Dashboard/shopMangerAdd/ShopAccess";


const Router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: '/shopecrease',
                element: <PrivetUser><ShopPageCreate></ShopPageCreate></PrivetUser>
            },
            {
                path:'/demovideo',
                element: <DemoVideo></DemoVideo>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        errorElement: <Error></Error>,
        children:[
            {
                path:'/dashboard/home',
                element:<PriveShopManger><DashHome></DashHome></PriveShopManger>
            },
            {
                path:"/dashboard/Productmanage",
                element: <PriveShopManger><ProductMangement></ProductMangement></PriveShopManger>
            },
            {
                path:'/dashboard/productcollection',
                element: <PriveShopManger><SalesCollection></SalesCollection></PriveShopManger>
            },
            {
                path:'/dashboard/salessummer',
                element: <PriveShopManger><SlesSummary></SlesSummary></PriveShopManger>
            },
            {
                path:'/dashboard/subsription',
                element: <PriveShopManger><Suscription></Suscription></PriveShopManger>
            },
            {
                path:'/dashboard/saleshistory',
                element:<PriveShopManger><SalesHistory></SalesHistory></PriveShopManger>
            },
            {
                path:'/dashboard/users',
                element: <PrivetAdmin><Users></Users></PrivetAdmin>
            },
            {
                path:'/dashboard/shopmage',
                element: <PrivetAdmin><MangeShop></MangeShop></PrivetAdmin>
            },
            {
                path:'/dashboard/offers',
                element:<PriveShopManger><OffersAndCoupon></OffersAndCoupon></PriveShopManger>
            },
            {
                path:'/dashboard/productadd',
                element:<PriveShopManger><ProductAddForm></ProductAddForm></PriveShopManger>
            },
            {
                path:'/dashboard/productupdate/:id',
                element:<PriveShopManger><ProductUpdate></ProductUpdate></PriveShopManger>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>
            },
            {
                path:'/dashboard/Paymentsus/:id',
                element:<Paymentsus></Paymentsus>
            },
            {
                path:'/dashboard/manageraccess',
                element:<ShopAccess></ShopAccess>
            }
            
        ]
    }
])

export default Router;