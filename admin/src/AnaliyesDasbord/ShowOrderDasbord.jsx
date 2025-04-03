import { useNavigate } from "react-router-dom";
import { UseOrders } from "../hooks/useOrder";
import { formatCurrency } from "../lib/Date-fns";

function ShowOrderDasbord() {
  const { Orders, loading, error } = UseOrders();
  console.log("Fetched Orders:", Orders);

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  // Check if Orders exist and if the order array is not empty
  const pendingOrders =
    Orders?.order?.filter((item) => item.status === "pending") || [];

  return (
    <div className="w-full  flex flex-col gap-5 h-[400px]  ">
      <div className="-mt-9  ">
        <h1>Recently Orders</h1>
      </div>
      <div className="space-y-4  dark:text-white dark:bg-slate-900 bg-white p-2">
        <ul>
          {pendingOrders.length > 0 ? (
            pendingOrders.slice(0, 3).map((item) => (
              <li
                key={item._id}
                className="space-y-2"
                onClick={() => navigate(`/order/${item._id}`)}
              >
                <div className="space-y-4">
                  {item.products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-gray-50 dark:bg-slate-950 rounded-lg p-4 flex items-center space-x-4"
                    >
                      <img
                        src={product.image}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <div className="mt-1 text-sm text-gray-600 dark:text-white">
                          <p>Quantity: {product.quantity}</p>

                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-start gap-10">
                        <div className="flex flex-col text-[11px]">
                          <h1 className="font-semibold">#{item.orderID}</h1>
                          <h2>
                            {item.user.name} {item.user.lastname}
                          </h2>
                        </div>
                        <div className="flex flex-col text-[10px]">
                          <h4 className="font-semibold"> {item.status}</h4>
                          <h3> {formatCurrency(item.totalAmount)}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))
          ) : (
            <li>No pending orders found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShowOrderDasbord;
