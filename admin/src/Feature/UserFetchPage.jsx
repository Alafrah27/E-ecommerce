import { GetAllUser } from "../hooks/Auth/useLogin";
import GetUsers from "../ui/GetUsers";
import Loading from "../ui/Loading";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function UserProfilePage() {
  const { AllUser, isPending, error } = GetAllUser();
  console.log(AllUser);
  if (error) return <h1>No Data Found</h1>;
  return (
    <div className="flex flex-col gap-4 w-full dark:bg-slate-900 bg-gray-50 py-2 ">
      <ul className="flex flex-col gap-4 w-full dark:bg-slate-900 bg-gray-50 py-2 px-2 ">
        {isPending ? (
          <Loading />
        ) : (
          AllUser?.map((item) => <GetUsers key={item._id} user={item} />)
        )}
      </ul>
      <div className="flex justify-end items-center gap-4 px-4 py-2">
        <button className=" flex items-center dark:bg-slate-950 bg-blue-500 text-white p-4 rounded-md">
          <span>
            <IoIosArrowBack />
          </span>
          <span className="flex items-center gap-2">previuos</span>
        </button>
        <button className=" flex items-center gap-4 dark:bg-slate-950 bg-blue-500 text-white p-4 rounded-md">
          <span className="flex items-center gap-2">Next</span>
          <span>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
}

export default UserProfilePage;
