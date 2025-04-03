import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnimatedCircle from "./ui/LazyCompoenet.jsx";

// Define the WaitComponent function
export const WaitComponent = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// Use lazy to import the App component
// const LazyApp = lazy(() =>
//   WaitComponent(3000)
//     .then(() => import("./App.jsx"))
//     .catch((error) => {
//       console.log(error);
//     })
// );
const MyComponent = lazy(() =>
  WaitComponent(1000).then(() =>
    import("./App.jsx").catch((error) => {
      console.log(error);
    })
  )
);

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
      <MyComponent />
    </Suspense>
    {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
  </QueryClientProvider>
);
