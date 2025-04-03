import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { UseProducts } from "../../hooks/Product/useProducts";
import Loading from "../../ui/Loading";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

function FetchProduct() {
  const { Products, isPending, error, handleNxtPage, handleBackPage, page } =
    UseProducts();

  if (error) return <h1>No Data Found</h1>;
  return (
    <div className="flex flex-col gap-4 w-full dark:bg-slate-900 bg-gray-50 py-2 ">
      <ul className="flex flex-col gap-4 w-full dark:bg-slate-900 bg-gray-50 py-2 px-2 ">
        {isPending ? (
          <Loading />
        ) : Products?.length === 0 ? (
          <h1 className="text-red-500 text-center mt-4">No Data to display</h1>
        ) : (
          Products?.product?.length > 0 &&
          Products?.product?.map((item) => (
            <ProductList key={item._id} item={item} />
          ))
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
            disabled={Products?.hasMore === false}
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
        <AddProduct />
      </div>
    </div>
  );
}

export default FetchProduct;
