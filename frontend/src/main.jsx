import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnimatedCircle from "./ui/LazyCmpoenet.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Helper function to add delay
const delayedImport = (importFn, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(importFn());
    }, delay);
  });
};

// Lazy load App with a 3-second delay
const LazyApp = lazy(() => delayedImport(() => import("./App.jsx")));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<AnimatedCircle />}>
      <CartProvider>
        <LazyApp />
      </CartProvider>
    </Suspense>
  </QueryClientProvider>
);
