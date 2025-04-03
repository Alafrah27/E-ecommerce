import { Link } from "react-router-dom";

function SendTemplate() {
  return (
    <div className="flex justify-center items-center h-screen w-full dark:bg-slate-950 dark:text-white bg-slate-50 text-blue-600">
      <div className="bg-white dark:bg-slate-900 p-4 w-[400px]">
        <h2 className="text-3xl font-bold text-center text-slate-500 py-4 capitalize p-4">
          Please check your email for the reset password
        </h2>
        <p className="text-center mt-5 p-2 cursor-pointer ">
          go back to{" "}
          <span className="text-blue-500">
            {" "}
            <Link to="/login">login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SendTemplate;
