function Product() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-[24px] space-x-2 font-semibold  ">All Items</h1>

        <span>filter</span>
      </div>
      <div className="flex flex-col  w-full border-2 border-gray-200 my-2 p-1">
        <div className="productList  flex   ">
          <div>image</div>
          <div>name</div>
          <div>discription</div>
          <div>discount</div>
          <div>price</div>
        </div>
        {/* <FetchProduct /> */}
        <span>fetch Product</span>

        <div className=" flex justify-between items-center bg-gray-50 px-4">
          {/* <OrderPagination /> */}
          {/* <AddProduct /> */}
          <span>order Pagenition</span>
          <span>Add Product</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
