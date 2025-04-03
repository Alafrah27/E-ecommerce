function DeleteAction({ onConfirm, user, type, onCloseModal, disabiled }) {
  // This is a common component for both "category" and "user"
  const renderConfirmationDialog = () => (
    <div className="">
      <div className="flex flex-col gap-4 my-4 py-3 px-5 w-full ">
        <h1 className="space-x-4 p-2 font-semibold text-base  lg:text-1xl text-center my-4 mx-auto text-slate-700 text-[18px] uppercase">
          {`Are You Sure You Want To Delete "${user}" From User List`}
          <span className="text-red-500 font-semibold text-[18px] uppercase mx-3 "></span>
        </h1>
        <div className="flex justify-end items-center gap-4">
          <button
            disabled={disabiled}
            onClick={() => {
              onConfirm?.();
              onCloseModal?.();
            }}
            className="px-3 my-5 py-4 bg-blue-500 border-none focus:outline-none text-white rounded-[3px] text-lg lg:text-3xl font-bold text-center"
          >
            Delete
          </button>
          <button
            onClick={() => onCloseModal?.()}
            className="px-3 my-5 py-4 bg-red-500 border-none focus:outline-none text-white rounded-[3px] text-lg lg:text-3xl font-bold text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  if (type === "category" || type === "user") {
    return renderConfirmationDialog();
  }

  return null; // Return null if type does not match
}

export default DeleteAction;
