import { XCircle, ArrowLeft, RefreshCcw, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

function CancelledPayment() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 w-full">
      <div className="max-w-7xl w-full space-y-8 ">
        {/* Cancelled Header */}
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment was not completed. No charges were made to your
            account.
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div>
              <p className=" font-medium text-gray-900">Transaction status</p>
              <p className="text-2xl font-bold text-gray-900">Cancelled</p>
            </div>
            <div className="bg-red-50 px-3 py-1 rounded-full">
              <p className="text-sm font-medium text-red-800">Not processed</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between ">
              <p className="text-gray-600">Attempted amount</p>
              <p className="text-gray-900 font-medium">$99.00</p>
            </div>
            <div className="flex justify-between ">
              <p className="text-gray-600">Date</p>
              <p className="text-gray-900 font-medium">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between ">
              <p className="text-gray-600">Reference</p>
              <p className="text-gray-900 font-medium">REF_12345678</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try payment again
          </button>

          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <CreditCard className="mr-2 h-4 w-4" />
            Update payment method
          </button>

          <Link
            to="/"
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CancelledPayment;
