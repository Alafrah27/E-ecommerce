import { format } from "date-fns";
import Modal from "./Models";
import Menus from "./Menus";
import DeleteAction from "./DeleteAction";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { UseDelteUser } from "../hooks/Auth/useLogin";
function GetUsers({ user }) {
  const {
    image,
    name,
    lastname,
    email,
    createdAt,
    isAdmin,
    _id: userId,
  } = user;

  const { DeleteUser, isPending } = UseDelteUser();

  const statusToTagName = {
    customer: "text-blue-700 bg-blue-100",
    isAdmin: "text-green-700 bg-green-100",
    //
  };
  const takeFirstLetters =
    name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();

  const tagStyle = statusToTagName[isAdmin === true ? "isAdmin" : "customer"];
  return (
    <div className="flex flex-col gap-4 w-full dark:bg-slate-900 bg-gray-50 ">
      <li
        className=" tableStayle border-b-[0.5px] lg:border-b-2   w-full flex items-center dark:text-white "
        key={userId}
      >
        <div className="w-full">
          {image ? (
            <img
              src={image}
              alt="User"
              className="w-[35px] h-[35px] rounded-full text-blue-600 border border-gray-100 object-cover"
            />
          ) : (
            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full text-blue-600 border border-gray-100 bg-gray-200">
              {takeFirstLetters}
            </div>
          )}
        </div>

        <h1>{name}</h1>
        <h1 className=" hidden md:block">{lastname}</h1>
        <h1 className=" md:hidden text-[12px] lg:text-2xl">
          {email.slice(0, 17)}
        </h1>
        <h1 className="hidden md:block text-[12px] lg:text-2xl">{email}</h1>
        <h1
          className={` hidden  lg:inline-block w-[70px]  px-3 py-1 text-uppercase text-center text-[10px] font-semibold  rounded-full ${tagStyle}`}
        >
          {isAdmin ? "Admin" : "Customer"}
        </h1>
        <h1 className="hidden md:block">{format(createdAt, "MM-dd-yyyy")}</h1>

        <div className="flex justify-end items-center text-[16px] w-full">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={userId} />

              <Menus.List id={userId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="delete">
                <DeleteAction
                  type="user"
                  onConfirm={() => {
                    DeleteUser(userId);
                  }}
                  disabiled={isPending}
                  user={name}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>

        {/* {show && (
      <Overlay
        show={show}
        setShow={setShow}
        user={user?._id}
        users={user.fristName}
      />
    )} */}
      </li>
    </div>
  );
}
export default GetUsers;
