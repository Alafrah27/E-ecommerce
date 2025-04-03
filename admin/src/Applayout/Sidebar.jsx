import MainNavbar from "../component/MainNavbar";

function Sidebar() {
  return (
    <div className="hidden    lg:flex flex-col  bg-grey-0 border-[0.5px] dark:bg-slate-950 dark:border-slate-900 border-gray-100   mx-auto py-4 px-[5rem]   ">
      <h3 className=" flex gap-3 text-3xl font-bold text-slate-700 text-center mt-7">
        {" "}
        ADMIN{" "}
        <span className="hidden lg:block text-3xl font-bold text-slate-700">
          DASHBOARD
        </span>
      </h3>
      <MainNavbar />
    </div>
  );
}

export default Sidebar;
