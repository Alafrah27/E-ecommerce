import Modal from "../../ui/Models";
import CreateCategory from "./CreateCategory";

function AddCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <button
            type="submit"
            className="text-base lg:text-2xl dark:bg-slate-900 bg-blue-500 text-white py-5 px-3 rounded-md border-none focus:outline-none"
          >
            Add new Category
          </button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateCategory />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCategory;
