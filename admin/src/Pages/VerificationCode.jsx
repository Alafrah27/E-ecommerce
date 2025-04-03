import { useState } from "react";

function VerificationCode() {
  const [email, setEmail] = useState("");
  return (
    <div className="flex justify-center items-center h-screen w-full bg-slate-50 text-blue-600">
      <div className="bg-white p-4 w-[400px]">
        <h2 className="text-3xl font-bold text-center text-slate-500 py-4 px-2">
          Check Your Email We Sent You Verification Code
        </h2>
        <form className="flex flex-col gap-4 p-10">
          <div className="flex  flex-col gap-5">
            <label className=" text-slate-500">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Inter Your Email"
              className="px-3 py-5 w-full focus:outline-none border border-grey-300 rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="px-3 py-5 my-5   w-full bg-blue-500 border border-none hover:bg-blue-700  focus:outline-none text-white my-3rounded-sm  text-3xl font-bold text-center p"
          >
            Verify Your Email
          </button>
          <p className="my-3 text-slate-500 flex gap-4">
            I have all ready account ?
            <span className="text-blue-500">
              <span>Login Now</span>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default VerificationCode;
