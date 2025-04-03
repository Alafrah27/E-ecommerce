import { Package2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { UserOrders } from "../hooks/useOrder/useOrder";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusIcon(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case "pending":
      return <Clock className="w-5 h-5 text-yellow-600" />;
    default:
      return <XCircle className="w-5 h-5 text-gray-600" />;
  }
}

function RecentlyOrder() {
  const { UserOrder } = UserOrders();
  const PendingOrder = UserOrder?.filter((order) => order.status === "pending");
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {PendingOrder?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Package2 className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your filters to see more orders.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {PendingOrder?.map((order) => (
              <div
                key={order.orderID}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Package2 className="w-6 h-6 text-indigo-600" />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderID}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-2 capitalize">{order.status}</span>
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.products.map((product) => (
                          <li key={product._id} className="py-6 flex">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3 className="flex-1">{product.name}</h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                                <div className="flex space-x-4 mt-1 text-sm text-gray-500">
                                  {product.size && <p>Size: {product.size}</p>}
                                  {product.color && (
                                    <p>Color: {product.color}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-end justify-between flex-1 text-sm">
                                <p className="text-gray-500">
                                  Qty {product.quantity}
                                </p>
                                <p className="font-medium text-gray-900">
                                  Subtotal: ${product.price * product.quantity}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Payment Method:{" "}
                        <span className="capitalize font-medium">
                          {order.paymentMethod}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        Total: ${order.totalAmount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentlyOrder;
