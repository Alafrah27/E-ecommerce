import React from "react";
import { Bell, CheckCircle2, XCircle, Package } from "lucide-react";
import {
  MarkasReadedNotifications,
  UseNotifications,
} from "../hooks/Notifications/useNotifications";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

// Helper function to get icon based on message content
const getNotificationIcon = (message) => {
  if (message.includes("created successfully")) {
    return <Package className="w-6 h-6 text-blue-500" />;
  } else if (message.includes("completed")) {
    return <CheckCircle2 className="w-6 h-6 text-green-500" />;
  } else if (message.includes("cancelled")) {
    return <XCircle className="w-6 h-6 text-red-500" />;
  }
  return <Bell className="w-6 h-6 text-gray-500" />;
};

// Helper function to get background color based on message content
const getNotificationBg = (message) => {
  if (message.includes("created successfully")) {
    return "bg-blue-50";
  } else if (message.includes("completed")) {
    return "bg-green-50";
  } else if (message.includes("cancelled")) {
    return "bg-red-50";
  }
  return "bg-gray-50";
};

function Notifications() {
  const { notifications, isLoading, error } = UseNotifications();
  const { MarkasReaded } = MarkasReadedNotifications();

  // const notifications = [
  //   {
  //     _id: "67eaca347224bdf448cc109d",
  //     userId: {
  //       _id: "67db59c85d2528c6a199d807",
  //       name: "ali",
  //       lastname: "edris yassin",
  //     },
  //     message: "Order #DWTL7EX has been created successfully",
  //     orderId: {
  //       _id: "67eaca347224bdf448cc1099",
  //       orderID: "DWTL7EX",
  //     },
  //     read: false,
  //     createdAt: "2025-03-31T17:00:36.942Z",
  //     updatedAt: "2025-03-31T17:00:36.942Z",
  //     __v: 0,
  //   },
  //   // ... other notifications
  // ];
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Notifications
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {notifications?.length} New
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications?.map((notification) => (
              <div
                key={notification?._id}
                className={`p-6 transition-colors hover:bg-gray-50 cursor-pointer ${
                  notification?.read ? "opacity-70 " : ""
                } ${getNotificationBg(notification?.message)}`}
              >
                <div
                  className="flex items-start space-x-4"
                  onClick={
                    notification?.read
                      ? () => {}
                      : () => MarkasReaded(notification?._id)
                  }
                >
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification?.message)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification?.userId?.name}{" "}
                      {notification?.userId?.lastname}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {notification?.message}
                    </p>
                    {notification?.orderId && (
                      <p className="text-xs text-gray-500 mt-1">
                        Order ID: {notification?.orderId?.orderID}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification?.createdAt)}
                    </p>
                  </div>
                  {!notification?.read && (
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
