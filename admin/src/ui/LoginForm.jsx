import { useState } from "react";
import { Link } from "react-router-dom";
import { UseLogin } from "../hooks/Auth/useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = UseLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="bg-white p-4 w-[400px] dark:bg-slate-950">
      <h2 className="text-3xl font-bold text-center text-slate-500 py-4">
        WellCome Back Again <br />
      </h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-10">
        <div className="flex  flex-col gap-5">
          <label className=" text-slate-500">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Inter Your Email"
            className="px-3 py-5 w-full dark:bg-slate-950 dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className=" text-slate-500">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Inter Your Password"
            className="px-3 py-5 w-full outline-none dark:bg-slate-950 dark:border-slate-400 border border-grey-300 focus:outline-none rounded-sm"
          />{" "}
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="px-3 py-5 my-5  dark:bg-slate-800  w-full bg-blue-500 border border-none hover:bg-blue-700  focus:outline-none text-white my-3rounded-sm  text-3xl font-bold text-center p"
        >
          {isPending ? "Loading..." : "Login"}
        </button>
        <p className="my-3 text-slate-500 flex gap-4">
          I forget my password ?
          <span className="text-blue-500">
            <span>
              <Link to="/forgetpassword">Forget Password</Link>
            </span>
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
