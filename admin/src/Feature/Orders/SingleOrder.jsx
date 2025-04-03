import { FaArrowLeft } from "react-icons/fa6";
import {
  CancelledOrderStatus,
  CompleteOrderStatus,
  UseOrder,
} from "../../hooks/useOrder";
import { formatCurrency } from "../../lib/Date-fns";
import {
  Package2,
  ArrowLeft,
  Printer,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Modal from "../../ui/Models";
import IvoicePdf from "../../ui/IvoicePdf";
import { useNavigate } from "react-router-dom";

function SingleOrder() {
  const navigate = useNavigate();
  const { Order } = UseOrder();
  const { CompletedOrder, isPending } = CompleteOrderStatus();
  const { CancelledOrder, isPending: isLoading } = CancelledOrderStatus();
  console.log("check from singleorder", Order);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getStatusColor = (status) => {
    const statusColors = {
      Processing: "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full dark:text-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-8 py-6 dark:bg-slate-900 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="text-gray-600 hover:text-gray-900 transition">
                  <FaArrowLeft
                    className="w-5 h-5 dark:text-white"
                    onClick={() => navigate(-1)}
                  />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Order Details
                </h1>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm dark:text-white dark:bg-slate-950 font-medium ${getStatusColor(
                  Order?.status
                )}`}
              >
                {Order?.status}
              </span>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Customer Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4 dark:text-white">
                    Customer Information
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3 dark:bg-slate-950">
                    <p className="text-gray-600 dark:text-white">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Name:
                      </span>{" "}
                      {Order?.user?.name + " " + Order?.user?.lastname}
                    </p>
                    <p className="text-gray-600 dark:text-white">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Email:
                      </span>{" "}
                      {Order?.user?.email}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4 dark:text-white">
                    Order Information
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3 dark:bg-slate-950 dark:text-white">
                    <p className="text-gray-600 dark:text-white">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Order ID:
                      </span>{" "}
                      {Order?.orderID}
                    </p>
                    <p className="text-gray-600 dark:text-white">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Date:
                      </span>{" "}
                      {formatDate(Order?.createdAt)}
                    </p>
                    <p className="text-gray-600 dark:text-white">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Payment Method:
                      </span>{" "}
                      {Order?.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 dark:text-white">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {Order?.products?.map((product) => (
                    <div
                      key={product._id}
                      className="bg-gray-50 dark:bg-slate-950 rounded-lg p-4 flex items-center space-x-4"
                    >
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {product?.name}
                        </h3>
                        <div className="mt-1 text-sm text-gray-600 dark:text-white">
                          <p>Quantity: {product.quantity}</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(product?.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-6 dark:bg-slate-950">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Total Amount
                    </span>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(Order?.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                disabled={Order?.status === "completed" || isPending}
                onClick={() => CompletedOrder(Order?._id)}
                className="inline-flex items-center px-6 py-4 border border-transparent rounded-lg text-sm font-medium text-white disabled:bg-green-300 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Completed
              </button>
              <button
                disabled={
                  Order?.status === "cancelled" ||
                  isLoading ||
                  Order?.status === "completed"
                }
                onClick={() => CancelledOrder(Order?._id)}
                className="inline-flex items-center px-6 py-4 border border-transparent rounded-lg text-sm font-medium text-white disabled:bg-red-300 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Order
              </button>
              <Modal>
                <Modal.Open opens="pdf">
                  <button className="inline-flex items-center px-6 py-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Invoice
                  </button>
                </Modal.Open>
                <Modal.Window name="pdf">
                  <IvoicePdf item={Order} />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
