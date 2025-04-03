import { UseAnaliyes } from "../hooks/analiyes/analiyes";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function DurationsChart() {
  const { Analiys } = UseAnaliyes();
  const DurationCarh = [
    {
      duration: "Total Price",
      value: Analiys?.totalSales, // Changed to number
      color: "#4caf50", // Green
    },
    {
      duration: "Products",
      value: Analiys?.productCount, // Changed to number
      color: "#ff9800", // Orange
    },
    {
      duration: "Items Sold",
      value: Analiys?.totalItemsSold, // Changed to number
      color: "#2196f3", // Blue
    },
    {
      duration: "Percentage",
      value: Analiys?.averageSalePerProduct + "%", // Changed to number
      color: "#f44336", // Red
    },
  ];
  return (
    <div className="   w-full  h-[400px]  ">
      <h1 className="text-[10px] space-x-2 font-semibold  uppercase my-5">
        Analiyes Chart
      </h1>
      <div className=" flex justify-center items-center bg-white dark:bg-slate-900 dark:text-white  h-full px-10   rounded-md">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={DurationCarh}
              nameKey="duration"
              dataKey="value"
              innerRadius={85}
              outerRadius={120}
              cx="63%"
              cy="50%"
              paddingAngle={1}
            >
              {DurationCarh.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DurationsChart;
