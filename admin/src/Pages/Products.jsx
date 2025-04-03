import FetchProduct from "../Feature/Products/FetchProduct";
import Filter from "../component/Filter";
import CategoryQuery from "../ui/categoryQuery";

function Products() {
  return (
    <div className="flex flex-col  w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="hidden md:block  md:text-[24px] space-x-2 font-semibold  ">
          Products
        </h1>
        <div className="flex justify-between items-center gap-14">
          <CategoryQuery />
          <Filter />
        </div>
      </div>
      <div className="flex flex-col w-full border-[0.5px] :border-gray-300 dark:bg-slate-950 dark:border-gray-700 my-3 lg:my-7 p-1">
        <div className="productList    ">
          <div>image</div>
          <div>Name</div>
          <div className="hidden md:block">description</div>
          <div>instock</div>
          <div>feature</div>
          <div>price</div>
        </div>
        <FetchProduct />
        {/* <Pagination /> */}
      </div>
    </div>
  );
}

export default Products;
