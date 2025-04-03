import Modal from "../../ui/Models";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../lib/Date-fns";
import DeleteAction from "../../ui/DeleteAction";
import CreateProduct from "./CreateProduct";
import { FaRegStar, FaStar } from "react-icons/fa6";
import {
  UseDelete,
  UseFeature,
  UseUnFeature,
} from "../../hooks/Product/useProducts";
import FeatureButton from "../../ui/FeatureButton";

// import { Link } from "react-router-dom";

function ProductList({ item }) {
  const {
    image,
    name,
    description,
    price,
    inStock,
    isFeature,
    _id: productId,
  } = item;

  const { Delete, isPending } = UseDelete();
  const { ProductFeatures } = UseFeature();
  const { UnFeatures } = UseUnFeature();
  

  return (
    <div>
      <li
        className=" productList border-b-[2px] w-full flex items-center   "
        key={productId}
      >
        {image && (
          <img
            src={image || "default-user.jpg"}
            alt="product Image"
            className="w-[35px] h-[35px] hover:scale-110    text-blue-600 bg-gray-400 object-cover cursor-pointer"
          />
        )}

        <h1 className="text-sm  lg:text-[13px]">
          {name.length > 15 ? name.slice(0, 16) + "." : name}
        </h1>
        <h1 className="hidden md:block">
          {description.length > 20
            ? description.slice(0, 30) + "..."
            : description}
        </h1>
        <h1>{inStock}</h1>

        <h1
          className="cursor-pointer"
          onClick={() => [
            isFeature === true
              ? UnFeatures(productId)
              : ProductFeatures(productId),
          ]}
        >
          {isFeature === true ? (
            <FaStar className="text-yellow-400" size={16} />
          ) : (
            <FaRegStar children="text-slate-500" size={16} />
          )}
        </h1>

        <h1>{formatCurrency(price)}</h1>

        <div className="flex justify-end items-center text-[16px]">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={productId} />

              <Menus.List id={productId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="feature">
                  <Menus.Button
                    icon={
                      isFeature === true ? (
                        <FaStar className="text-yellow-400" size={13} />
                      ) : (
                        <FaRegStar children="text-slate-500" size={13} />
                      )
                    }
                  >
                    {isFeature === true ? "feature" : "unfeature"}
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateProduct productToEdit={item} />
              </Modal.Window>

              <Modal.Window name="delete">
                <DeleteAction
                  type="user"
                  user={name}
                  disabiled={isPending}
                  onConfirm={() => {
                    Delete(productId);
                  }}
                />
              </Modal.Window>

              <Modal.Window name="feature">
                <FeatureButton
                  type="user"
                  user={name}
                  isFeature={isFeature === true ? "unfeature" : "feature"}
                  disabiled={isPending}
                  onConfirm={() => {
                    isFeature === true
                      ? UnFeatures(productId)
                      : ProductFeatures(productId);
                  }}
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

export default ProductList;
