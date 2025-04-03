import { formatDate } from "../lib/Date-fns";
import Stats from "../AnaliyesDasbord/Stats";
import Charts from "../AnaliyesDasbord/Charts";
import SalesChart from "../AnaliyesDasbord/SalesChart";
import TopCustomer from "../AnaliyesDasbord/TopCustomer";
import UserChart from "../AnaliyesDasbord/UserChart";

function Dashboard() {
  return (
    <div className="  w-full px-4 h-screen mx-auto  ">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-[24px]  font-semibold  ">Admin Panel </h1>
        <div className="flex flex-col lg:flex-row  items-center lg:gap-4 ">
          <h1 className="text-[10px] lg:text-[20px]  font-semibold   ">
            {formatDate(new Date(), "yyyy-MM-dd")}
          </h1>
          <h1 className="text-sm lg:text-[20px] font-semibold   "></h1>
        </div>
      </div>
      <div className=" flex flex-col gap-12 w-full">
        <Stats />
        <Charts />

        <div className=" w-full h-auto mt-[2rem]"></div>
        <SalesChart />
        <TopCustomer />
        <UserChart />
      </div>
    </div>
  );
}

export default Dashboard;
