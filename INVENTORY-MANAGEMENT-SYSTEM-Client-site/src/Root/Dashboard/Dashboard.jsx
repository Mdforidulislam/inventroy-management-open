import { Outlet } from "react-router-dom";
import Menubar from "./Menubar";

const Dashboard = () => {
  return (
    <div>
      <div className="flex gap-10">
        <div>
          <Menubar></Menubar>
        </div>
        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="border-t-2 text-center p-10 ">
        <h1>2023@copy right reserve by admin </h1>
      </div>
    </div>
  );
};

export default Dashboard;
