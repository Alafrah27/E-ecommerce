import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
} from "recharts";
import { GetAllUser } from "../hooks/Auth/useLogin";
import { UseAnaliyes } from "../hooks/analiyes/analiyes";

function SalesChart() {
  const { AllUser } = GetAllUser();
  const { Analiys } = UseAnaliyes();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [
    {
      name: "Users",
      value: AllUser?.length,
    },
    {
      name: "Porducts",
      value: Analiys?.productCount,
    },
    {
      name: "Orders",
      value: Analiys?.totalItemsSold,
    },
  ];
  return (
    <div className="w-full  ">
      <div className="mb-8">
        <h1>Sales Chart</h1>
      </div>
      <div className="w-full h-[400px] dark:bg-slate-900 dark:text-white bg-white ">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.5)",
                borderColor: "#4b5564",
              }}
              itemStyle={{ color: "white" }}
            />
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#0088FE">
              {data.map((item, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
