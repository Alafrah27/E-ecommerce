import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UseAnaliyes } from "../hooks/analiyes/analiyes";
import { GetAllUser } from "../hooks/Auth/useLogin";

const UserChart = () => {
  const { Analiys } = UseAnaliyes();
  const { AllUser } = GetAllUser();
  const salesData = [
    { name: "Jul", sales: Analiys?.totalSales },
    { name: "Aug", sales: Analiys?.productCount },
    { name: "Sep", sales: Analiys?.totalItemsSold },
    { name: "Oct", sales: Analiys?.averageSalePerProduct },
    { name: "Nov", sales: AllUser?.length },
  ];
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Growth and Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default UserChart;
