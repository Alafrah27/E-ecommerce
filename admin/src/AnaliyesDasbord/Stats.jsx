import {
  HiMiniCalculator,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiTruck,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../lib/Date-fns";
import { UseAnaliyes } from "../hooks/analiyes/analiyes";
function Stats() {
  const { Analiys } = UseAnaliyes();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3 flex-grow w-full">
      <Stat
        value={Analiys?.productCount}
        title="Total Products"
        color="blue"
        icon={<HiMiniCalculator />}
      />
      <Stat
        value={Analiys?.totalItemsSold}
        title="Total Items Sold"
        color="green"
        icon={<HiTruck />}
      />
      <Stat
        value={formatCurrency(Analiys?.totalSales)}
        title="Total Amount"
        color="yellow"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        value={Analiys?.averageSalePerProduct + "%"}
        title="Occupancy Rate "
        color="red"
        icon={<HiOutlineChartBar />}
      />
    </div>
  );
}
export default Stats;
