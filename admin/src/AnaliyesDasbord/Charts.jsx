import DurationsChart from "./DurationsChart";

import ShowOrderDasbord from "./ShowOrderDasbord";

function Charts() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 space-y-12 ite  h-auto    ">
      <DurationsChart />
      <ShowOrderDasbord />
    </div>
  );
}

export default Charts;
