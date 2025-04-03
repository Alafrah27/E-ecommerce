import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseSignup } from "../hooks/Auth/useLogin";

function SignupForm() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { SignupUser, isPending } = UseSignup();

  useEffect(() => {
    const getLoction = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setLatitude(position?.coords?.latitude);
        setLongitude(position?.coords?.longitude);
      });
    };
    getLoction();
    const intervalFn = setInterval(getLoction, 2000);

    return clearInterval(intervalFn);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const formdata = {
      name,
      lastname,
      email,
      password,
      location: {
        lat: latitude,
        lang: longitude,
      },
    };
    console.log(formdata);
    SignupUser(formdata);
  };

  return (
    <div className="bg-white p-4 w-[400px] dark:bg-slate-950">
      <div className="flex flex-col items-center gap-2">
        <img
          src="mainlogo.jpeg"
          alt="logo ecommerce"
          className="w-[100px] h-[100px] object-cover"
        />
        <span className="text-xl font-semibold text-center text-slate-500 py-2">
          Musdar Shope
        </span>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-10">
        <div className="flex  flex-col gap-5">
          <label className=" text-slate-500">FirstName</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Inter Your Name"
            className="px-3 py-5 w-full dark:bg-slate-950 dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
          />
        </div>
        <div className="flex  flex-col gap-5">
          <label className=" text-slate-500">LastName</label>
          <input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            type="text"
            placeholder="Inter Your Name"
            className="px-3 py-5 w-full dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
          />
        </div>
        <div className="flex  flex-col gap-5">
          <label className=" text-slate-500">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Inter Your Email"
            className="px-3 py-5 w-full  dark:border-slate-400 focus:outline-none border border-grey-300 rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className=" text-slate-500">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Inter Your Password"
            className="px-3 py-5 w-full outline-none  dark:border-slate-400 border border-grey-300 focus:outline-none rounded-sm"
          />{" "}
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="px-3 py-5 my-5 disabled:bg-blue-200   w-full bg-blue-500 border border-none hover:bg-blue-700  focus:outline-none text-white my-3rounded-sm  text-3xl font-bold text-center p"
        >
          {isPending ? "Loading..." : "register"}
        </button>
        <p className="my-3 text-slate-500 flex gap-4">
          I have an account ?
          <span className="text-blue-500">
            <span>
              <Link to="/login">login</Link>
            </span>
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
