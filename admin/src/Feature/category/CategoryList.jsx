import { HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Models";
import DeleteAction from "../../ui/DeleteAction";
import Loading from "../../ui/Loading";
import { UseDelete } from "../../hooks/UseCategory/useCateogry";

function CategoryList({ item }) {
  const { image: cover, name: names, _id: categoryId } = item;

  const { Delete, isPending } = UseDelete();

  return (
    <li
      className=" flex   gap-4 list-none no-underline w-full"
      key={categoryId}
    >
      <div className="flex flex-col gap-4 w-full py-3 dark:bg-slate-900 dark:text-white bg-gray-50 px-5">
        <div className="flex justify-end font-bold text-1xl w-full my-2">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={categoryId} />

              <Menus.List id={categoryId}>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash size={20} />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="delete">
                <DeleteAction
                  type="category"
                  user={names}
                  disabiled={isPending}
                  onConfirm={() => {
                    Delete(categoryId);
                  }}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
        <div>
          <h1 className="font-bold text-1xl w-full my-2 mx-auto">{names}</h1>
          <img
            src={cover}
            alt="category"
            className="object-cover text-center hover:scale-110 transition-all duration-300 ease-in-out w-full h-[200px] bg-transparent"
          />
        </div>
      </div>
    </li>
  );
}

export default CategoryList;
