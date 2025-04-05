import React from "react";
import { Minus, Plus } from "lucide-react";
import { UseCartApi } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../lib/Date-Fns";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../lib/Axios";

import { UserInfo } from "../hooks/Auth/useLogin";
import { UseCashOrder } from "../hooks/Auth/useLogin";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(
  "pk_test_51R3zKLEi7jet9mjqMObrhOaM8N9hrgP3pAfnd3FJWTDSMu4iixVLaXVK5ZQt5JxDjdSOF6k4lK0E0zCLbAvVLxr300iB7R9BPp"
);

function Cart() {
  const {
    products,
    setProducts,
    increaseItemQuantity,
    decreaseItemQuantity,
    deleteItem,
  } = UseCartApi();
  const navigate = useNavigate();
  const { User } = UserInfo();
  const { CashOrder } = UseCashOrder();

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log("from cart", products);

  const handleCheckout = async () => {
    const items = products.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.image,
    }));
    const stripe = await stripePromise;
    const res = await axiosInstance.post("/payments/create-checkout-session", {
      products: items,
    });

    const session = res.data;
    console.log(session);

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  const handleCashOnDelivery = () => {
    const product = products.map((item) => ({
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.image,
    }));

    CashOrder({ products: product });
    setProducts([]);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 mt-3">
      <Helmet>
        <title>Shpoing Now and elevate your experience</title>

        <meta
          name="description"
          content="Review and manage your selections in your shopping cart at Musdar E-commerce. Enjoy easy checkout, secure transactions, and a seamless shopping experience. Hurry, your favorite items are waiting!"
        />
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="py-6 px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Shopping Cart
          </h2>
          <div className="mt-4">
            <ul className="divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((item) => (
                  <li
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="py-4 flex space-x-4 items-center"
                  >
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color} | {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => decreaseItemQuantity(item.id)}
                            className="p-1 h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => increaseItemQuantity(item?.id)}
                            className="p-1 h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-500 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li
                  className="py-4 text-center text-gray-500"
                  onClick={() => navigate("/")}
                >
                  Your cart is empty. Click here!
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <p>Subtotal</p>
            <h1 className="font-bold text-2xl">{formatCurrency(total)}</h1>
          </div>
          <p className="mt-0.5  text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            {products.length > 0 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={
                    !User ? () => navigate("/login") : handleCashOnDelivery
                  }
                  className="w-full py-5 border text-2xl border-transparent rounded-md shadow-md  font-semibold text-white bg-green-400 hover:bg-green-500 "
                >
                  Cash on Delivery
                </button>
                <button
                  onClick={!User ? () => navigate("/login") : handleCheckout}
                  className="w-full py-5 border text-2xl border-transparent rounded-md shadow-md  font-semibold text-white bg-blue-400 hover:bg-blue-500 "
                >
                  Checkout with Stripe
                </button>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              or{" "}
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="text-blue-600 font-medium hover:text-blue-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
