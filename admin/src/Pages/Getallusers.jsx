// import { useSearchParams } from "react-router-dom";
import UserFtechPage from "../Feature/UserFetchPage";
import { GetAllUser } from "../hooks/Auth/useLogin";
function Getallusers() {
  // const [setSearchParams] = useSearchParams();

  const { handleSearch } = GetAllUser();

  return (
    <div className="flex flex-col  w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-[24px] space-x-2 font-semibold  "> All Users</h1>
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          className="flex j py-5 px-3 dark:bg-slate-950 dark:text-white dark:border-slate-700 border-gray-300 border-solid-3 w-1/2   bg-none border rounded-md focus:outline-none"
          placeholder="Search by Name"
        />
      </div>
      <div className="flex flex-col w-full border-[0.5px] :border-gray-300 dark:bg-slate-950 dark:border-gray-700 my-3 lg:my-7 p-1">
        <div className="tableStayle  mx-8   ">
          <div>image</div>
          <div>Name</div>
          <div className="hidden md:block">LastName</div>
          <div>Email</div>
          <div className="hidden md:block">Status</div>
          <div className="hidden md:block">CreateAt</div>
        </div>
        <UserFtechPage />
        {/* <Pagination /> */}
      </div>
    </div>
  );
}

export default Getallusers;
