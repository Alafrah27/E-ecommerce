import FetchOrders from "../Feature/Orders/FetchOrders";
import OrderFilterByStatus from "../Feature/Orders/OrderFilterByStatus";
import OrderOperationsFiltere from "../Feature/Orders/OrderOperationsFilter";

function Orders() {
  return (
    <div className="flex flex-col  w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="hidden md:block  md:text-[24px] space-x-2 font-semibold  ">
          Orders
        </h1>
        <div className="flex justify-between items-center gap-14">
          {/* <CategoryQuery /> */}
          {/* <Filter /> */}
          <OrderFilterByStatus />
          <OrderOperationsFiltere />
        </div>
      </div>
      <div className="flex flex-col w-full border-[0.5px] :border-gray-300 dark:bg-slate-950 dark:border-gray-700 my-3 lg:my-7 p-1">
        <div className="productList lg:ml-4   ">
          <div>ID</div>
          <div className="hidden md:block">Name</div>
          <div className="hidden md:block">email </div>
          <div>payment</div>
          <div>status</div>
          <div>totalAmount</div>
        </div>
        <FetchOrders />
        {/* <Pagination /> */}
      </div>
    </div>
  );
}

export default Orders;
