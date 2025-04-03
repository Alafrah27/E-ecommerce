import { useState } from "react";
import { toast } from "react-toastify";
import { UseResetPassword } from "../hooks/Auth/useLogin";
import { Link, useParams } from "react-router-dom";

function ResetPossword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { token } = useParams();
  const { RestPassword, isPending } = UseResetPassword();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password === "" || confirm === "") {
      toast.error("you can nor send empty password");
    }
    if (password !== confirm) {
      toast.error("password are not match");
    } else {
      RestPassword({ token, password });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full dark:bg-slate-950 dark:text-white bg-slate-50 text-blue-600">
      <div className="bg-white p-4 w-[400px] dark:bg-slate-950">
        <h2 className="text-3xl font-bold text-center text-slate-500 py-4">
          Reset Your Password
        </h2>
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 p-10"
        >
          <div className="flex flex-col gap-5">
            <label className=" text-slate-500">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Inter Your Email"
              className="px-3 py-5 w-full dark:bg-slate-950 dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-5">
            <label className=" text-slate-500">Confirm</label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="Inter Your Email"
              className="px-3 py-5 w-full dark:bg-slate-950 dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="px-3 py-5 my-5   w-full bg-blue-500 border border-none hover:bg-blue-700  focus:outline-none text-white my-3rounded-sm  text-3xl font-bold text-center p"
          >
            {isPending ? "Reseting..." : "Reset Password"}
          </button>
          <p className="my-3 text-slate-500 flex gap-4">
            go back to login page ?
            <Link to="/login">
              <span className="text-blue-500">
                <span>Login Now</span>
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPossword;
