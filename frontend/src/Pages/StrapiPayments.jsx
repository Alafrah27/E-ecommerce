import { CheckCircle, ArrowLeft, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/Axios";
import { UseCartApi } from "../context/CartContext";
import { toast } from "react-toastify";
function StripePayments() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { setProducts } = UseCartApi();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axiosInstance.post("/payments/checkout-success", {
          sessionId,
        });
      } catch (error) {
        console.error(error);
        setError("An error occurred during checkout");
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
      setProducts([]);
      toast.success("Payment was successful");
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
      toast.error("No session ID found in the URL");
    }

    return () => {
      // Cleanup function can be added here if needed
    };
  }, [setProducts]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">processing...</div>
      </div>
    );
  }
  if (error) return <h1>{error}</h1>;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Success Header */}
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment successful
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your payment. We have sent you an email with your
            receipt.
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Amount paid</p>
              <p className="text-2xl font-bold text-gray-900">$99.00</p>
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full">
              <p className="text-sm font-medium text-green-800">Paid</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Payment method</p>
              <p className="text-gray-900 font-medium">Visa ending in 4242</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Date</p>
              <p className="text-gray-900 font-medium">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Transaction ID</p>
              <p className="text-gray-900 font-medium">TXN_12345678</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Download className="mr-2 h-4 w-4" />
            Download receipt
          </button>

          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Mail className="mr-2 h-4 w-4" />
            Email receipt
          </button>

          <Link
            to="/"
            className="w-full flex items-center justify-center px-4 py-2  font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            check your order 😍🥰
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StripePayments;
