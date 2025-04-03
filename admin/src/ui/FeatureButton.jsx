function FeatureButton({
  onCloseModal,
  onConfirm,
  disabiled,
  user,
  type,
  isFeatured,
}) {
  const featureButton = () => (
    <div className="">
      <div className="flex flex-col gap-4 my-4 py-3 px-5 w-full ">
        {isFeatured && (
          <h1 className="space-x-4 p-2 font-semibold   lg:text-1xl text-center my-4 mx-auto text-slate-700 text-[18px] uppercase">
            {`Are You Sure You Want To feature
           "${user}" From ${!isFeatured ? "feature" : "order"} List`}
          </h1>
        )}

        <h1 className="space-x-4 p-2 font-semibold   lg:text-1xl text-center my-4 mx-auto text-slate-700 text-[18px] uppercase">
          Are You Sure You Want To change the order status
        </h1>
        <div className="flex justify-end items-center gap-4">
          {isFeatured && (
            <button
              disabled={disabiled}
              onClick={() => {
                onConfirm?.();
                onCloseModal?.();
              }}
              className="px-3 my-5 py-4 bg-blue-500 border-none focus:outline-none text-white rounded-[3px] text-lg lg:text-3xl font-bold text-center"
            >
              {isFeatured ? "Unfeature" : "Feature"}
            </button>
          )}

          <button
            disabled={disabiled}
            onClick={() => {
              onConfirm?.();
              onCloseModal?.();
            }}
            className="px-3 my-5 py-4 bg-blue-500 border-none focus:outline-none text-white rounded-[3px] text-lg lg:text-3xl font-bold text-center"
          >
            changes status
          </button>

          <button
            onClick={() => onCloseModal?.()}
            className="px-3 my-5 py-4 bg-red-500 border-none focus:outline-none text-white rounded-[3px] text-lg lg:text-3xl font-bold text-center"
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
  if (type === "category" || type === "user") {
    return featureButton();
  }
  return null;
}

export default FeatureButton;
