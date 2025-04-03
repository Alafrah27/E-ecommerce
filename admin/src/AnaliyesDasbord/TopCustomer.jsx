import { GetAllUser } from "../hooks/Auth/useLogin";
import GetUsers from "../ui/GetUsers";

function TopCustomer() {
  const { AllUser } = GetAllUser();
  return (
    <div className="w-full py-2 px-4 mt-10">
      <h1 className="mb-6 font-semibold text-[12px] ">Top 10 Customers</h1>
      <div>
        <ul className="flex flex-col justify-center items-center gap-4">
          {AllUser?.slice(0, 6).map((item) => (
            <GetUsers key={item._id} user={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopCustomer;
