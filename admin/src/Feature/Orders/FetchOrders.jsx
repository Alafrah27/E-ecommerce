import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { UseOrders } from "../../hooks/useOrder";
import Loading from "../../ui/Loading";
import OrderList from "./OrderList";
function FetchOrders() {
  const { Orders, isPending, error, handleNxtPage, handleBackPage, page } =
    UseOrders();

  if (error) return <h1>No Data Found</h1>;
  return (
    <div className=" flex flex-col gap-4 w-full dark:bg-slate-900 bg-gray-50 py-2 ">
      <ul className="flex flex-col  gap-4 w-full dark:bg-slate-900 bg-gray-50 py-2 px-5">
        {isPending ? (
          <Loading />
        ) : Orders?.order?.length === 0 ? (
          <h1 className="text-red-500 text-center ">No Data to display</h1>
        ) : (
          Orders?.order?.length > 0 &&
          Orders?.order?.map((item) => <OrderList key={item._id} item={item} />)
        )}
      </ul>
      <div className="flex justify-between items-center gap-4 px-3 py-2">
        <div className="flex justify-end items-center gap-4 px-4 py-2">
          <button
            disabled={page === 0}
            onClick={() => {
              handleBackPage();
            }}
            className=" text-base flex items-center dark:bg-slate-950 bg-blue-500 text-white p-4 rounded-md"
          >
            <span className="dark:text-white">
              <IoIosArrowBack size={17} />
            </span>
            <span className="flex items-center gap-2">previuos</span>
          </button>
          <button
            disabled={Orders?.hasMoreOrders === false}
            onClick={() => {
              handleNxtPage();
            }}
            className=" flex items-center text-base  gap-4 dark:bg-slate-950 bg-blue-500 text-white p-4 rounded-md"
          >
            <span className="flex items-center gap-2">Next</span>
            <span className="dark:text-white">
              <IoIosArrowForward size={17} />
            </span>
          </button>
        </div>
        {/* <AddProduct /> */}
      </div>
    </div>
  );
}
export default FetchOrders;
