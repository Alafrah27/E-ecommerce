import { useState } from "react";
import { UseForgetPassword } from "../hooks/Auth/useLogin";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { SendForgetPasswordToEmail, isPending } = UseForgetPassword();
  const handleRsetPassword = (e) => {
    e.preventDefault();
    SendForgetPasswordToEmail({ email });
    setEmail("");
  };
  return (
    <div className="flex justify-center items-center h-screen w-full  bg-slate-50 text-blue-600">
      <div className="bg-white p-4 w-[400px] ">
        <h2 className="text-3xl font-bold text-center text-slate-500 py-4">
          Reset Your Password
        </h2>
        <form
          onSubmit={handleRsetPassword}
          className="flex flex-col gap-4 p-10"
        >
          <div className="flex flex-col gap-5">
            <label className=" text-slate-500">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Inter Your Email"
              className="px-3 py-5 w-full  dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="px-3 py-5 my-5  dark:border-slate-400    w-full bg-blue-500 border border-none hover:bg-blue-700  focus:outline-none text-white my-3rounded-sm  text-3xl font-bold text-center p"
          >
            {isPending ? "Sending..." : "forget password"}
          </button>
          <p className="my-3 text-slate-500 flex gap-4">
            I have all ready account ?
            <Link to="/login" className="cursor-pointer">
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

export default ForgetPassword;
