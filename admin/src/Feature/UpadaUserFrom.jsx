import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsepdateUser } from "../hooks/Auth/useLogin";
import { Loader } from "lucide-react";
import { axiosInstance } from "../lib/Axios";
import { readFileAsDataURL } from "../helper/ReadFileAsDataURL";

function UpadaUserFrom() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await axiosInstance
        .get("/user/profile")
        .then((res) => {
          setEmail(res.data.email);
          setName(res.data.name);
          setLastName(res.data.lastname);
        })
        .catch((err) => {
          console.error("Fehler beim Abrufen der Benutzer:", err);
          throw err; //
        });
    }
    getUserData();
  }, []);

  const { UpdateProfile, isPending } = UsepdateUser();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {
      name,
      lastname,
      email,
    };
    if (image) {
      updateData.image = await readFileAsDataURL(image);
    }

    console.log(updateData);
    UpdateProfile(updateData);
  };

  return (
    <div className="flex flex-col justify-start gap-4 w-full">
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-10 w-full dark:bg-slate-950 bg-gray-50 border-gray-100 my-4 mx-auto px-10 py-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          <label className="text-3xl  outline-none">FrirstName</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-5 px-3 dark:bg-slate-950 dark:border-slate-600 border-gray-300 border-solid-3 w-full  lg:w-1/2 bg-none border rounded-md focus:outline-none"
            type="type"
            placeholder="Enter Your FrisName"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          <label className="text-3xl  outline-none">LastName</label>
          <input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="py-5 px-3 dark:bg-slate-950 dark:border-slate-600 border-gray-300 border-solid-3 w-full  lg:w-1/2 bg-none border rounded-md focus:outline-none"
            type="type"
            placeholder="Enter Your LastName"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[7rem]  ">
          <label className="text-3xl  outline-none" htmlFor="">
            Email
          </label>
          <input
            value={email}
            disabled={true}
            onChange={(e) => setEmail(e.target.value)}
            className="py-5 px-3  dark:bg-slate-950 dark:border-slate-600  border-gray-300 border-solid-3 w-full lg:w-1/2 bg-none border rounded-md focus:outline-none"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[7rem]  ">
          <label className="text-3xl  outline-none" htmlFor="">
            Image
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="py-5 px-3  dark:bg-slate-950 dark:border-slate-600  border-gray-300 border-solid-3 :w-1/2 bg-none border rounded-md focus:outline-none"
            type="file"
            accept="image/*"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="flex flex-row justify-end items-center gap-3">
          <button
            disabled={isPending}
            type="submit"
            className="bg-blue-500 dark:bg-slate-900 text-white py-5 px-5 rounded-md border-none focus:outline-none"
          >
            {isPending ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              "update Profile"
            )}
          </button>
          <button
            onClick={() => navigate()}
            className="bg-red-500     text-white py-5 px-5 rounded-md border-none focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpadaUserFrom;
