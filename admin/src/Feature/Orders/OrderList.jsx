import { HiPrinter, HiTrash } from "react-icons/hi2";
import { TiCancel } from "react-icons/ti";
import { formatCurrency } from "../../lib/Date-fns";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Models";
import DeleteAction from "../../ui/DeleteAction";
import { CheckCheck } from "lucide-react";
import FeatureButton from "../../ui/FeatureButton";

import {
  CompleteOrderStatus,
  CancelledOrderStatus,
  DeleteOrders,
} from "../../hooks/useOrder";
import IvoicePdf from "../../ui/IvoicePdf";

import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

function OrderList({ item }) {
  const {
    _id: orderId,
    user: { name, email },
    paymentMethod,
    totalAmount,
    status,
    orderID,
  } = item;

  const { CompletedOrder, isPending } = CompleteOrderStatus();
  const { CancelledOrder, isPending: isLoading } = CancelledOrderStatus();
  const { Deleting, isPending: isDeleting } = DeleteOrders();
  const navigate = useNavigate();
  const statusToTagName = {
    completed: "text-blue-700 ",
    pending: "text-green-700 ",
    cancelled: "text-red-700  ",
    //
  };
  const paymentsToTagName = {
    cash: "text-blue-700 ",
    online: "text-blue-900 ",

    //
  };

  return (
    <li
      // onClick={() => navigate(`/order/${orderId}`)}
      className=" flex justify-between items-center gap-2 p-2 cursor-pointer  md:productList border-b-[2px] w-full hover:bg-gray-100 dark:hover:bg-gray-800   "
      key={orderId}
    >
      <h1 className="">{orderID}</h1>
      <h1 className="hidden md:block ">{name}</h1>
      <h1 className="hidden md:block"> {email}</h1>
      <span
        className={`flex justify-center items-center text-uppercase text-center font-semibold    ${paymentsToTagName[paymentMethod]}`}
      >
        {paymentMethod}
      </span>

      <h1
        className={` flex   justify-center items-center text-uppercase text-center lg:text-[12px] font-semibold px-2 py-3 rounded-full ${statusToTagName[status]}`}
      >
        {status}
      </h1>

      <h1>{formatCurrency(totalAmount)}</h1>

      <div className="flex justify-end items-center text-[16px]">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={orderId} />

            <Menus.List id={orderId}>
              <Modal.Open>
                <Menus.Button
                  onClick={() => navigate(`/order/${orderId}`)}
                  icon={<FaEye />}
                >
                  <span onClick={() => navigate(`/order/${orderId}`)}>
                    View
                  </span>
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="invoice">
                <Menus.Button icon={<HiPrinter />}>Invoice</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="complete">
                <Menus.Button icon={<CheckCheck size={15} />}>
                  Completed
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="cancel">
                <Menus.Button icon={<TiCancel />}>Cancelled</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="invoice">
              <IvoicePdf item={item} />
            </Modal.Window>

            <Modal.Window name="delete">
              <DeleteAction
                type="user"
                user={name}
                disabiled={isDeleting}
                isPending={isDeleting}
                onConfirm={() => Deleting(orderId)}
              />
            </Modal.Window>
            <Modal.Window name="cancel">
              <FeatureButton
                type="user"
                user={name}
                status={status}
                isPending={isLoading}
                onConfirm={() => CancelledOrder(orderId)}
              />
            </Modal.Window>
            <Modal.Window name="complete">
              <FeatureButton
                type="user"
                isPending={isPending}
                onConfirm={() => CompletedOrder(orderId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </li>
  );
}

export default OrderList;
