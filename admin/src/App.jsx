import Login from "./Pages/Login";

import Applayout from "./Applayout/Applayout";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerificationCode from "./Pages/VerificationCode";
import ResetPossword from "./Pages/ResetPossword";
import ForgetPassword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import ProtesRoutes from "./ProtctRout/ProtesRoutes";
import SendTemplate from "./component/SendTemplate";
import { UserInfo } from "./hooks/Auth/useLogin";
import Getallusers from "./Pages/Getallusers";
import PageNotFound from "./Pages/PageNotFound";
import UserProfile from "./Pages/UserProfile";
import UserLoction from "./Pages/UserLoction";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Category from "./Pages/Category";
import SupportTeam from "./Pages/SupportTeam";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import SingleOrder from "./Feature/Orders/SingleOrder";

function App() {
  const { User } = UserInfo();

  console.log(User);
  return (
    <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position=" bottom-right " />
      <Routes>
        <Route
          element={
            User && User?.isAdmin === true && User?.isVerify === true ? (
              <Applayout />
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              User && User?.isAdmin === true && User?.isVerify === true ? (
                <Dashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/allusers" element={<Getallusers />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/location" element={<UserLoction />} />
          <Route path="/products" element={<Products />} />
          <Route path="/team" element={<SupportTeam />} />
          <Route path="/category" element={<Category />} />
          <Route path="/order" element={<Orders />} />
          <Route path="order/:id" element={<SingleOrder />} />
        </Route>

        <Route path="/verify" element={<VerificationCode />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restpassword/:token" element={<ResetPossword />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailtemplate" element={<SendTemplate />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
