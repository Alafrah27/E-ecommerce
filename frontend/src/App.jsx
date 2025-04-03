import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../src/Pages/Login";
import VerificationCode from "../src/Pages/VerificationConde";
import ResetPossword from "../src/Pages/RestPassword";
import ForgetPassword from "../src/Pages/ForgetPaaword";
import SendTemplate from "../src/Pages/SendTemplate";
import PageNotFound from "../src/Pages/PageNotFound";
import Singup from "./Pages/Singup";
import Home from "./Pages/Home";
import SingleProduct from "./compoenent/SingleProduct";
import Cart from "./Pages/Cart";
import AllCategory from "./Pages/AllCategory";
import AllProduct from "./Pages/AllProduct";
import Comment from "./compoenent/Comment";
import ReviewProduct from "./compoenent/Review";
import StrapiPayments from "./Pages/StrapiPayments";
import CanclledPayment from "./Pages/CanclledPayment";
import Notification from "./Pages/Notification";
import MyOrder from "./Pages/MyOrder";
import RecentlyOrder from "./Pages/RecentlyOrders";
import { Helmet } from "react-helmet";

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Musdar E-commerce</title>

        <meta
          name="description"
          content="Explore Musdar E-commerce for a delightful online shopping experience! Discover a wide range of quality products, unbeatable prices, and superb customer service. Shop now and find exactly what you need!"
        />
        <meta
          name="keywords"
          content="Musdar E-commerce, online shope Eritrea, Sudan, Ethiopia "
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />}>
          <Route path="description" element={<ReviewProduct />} />
          <Route path="review" element={<Comment />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<AllCategory />} />
        <Route path="/product" element={<AllProduct />} />
        <Route path="/success-payment" element={<StrapiPayments />} />
        <Route path="/cancel-payment" element={<CanclledPayment />} />
        <Route path="/natification" element={<Notification />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/recentlyorder" element={<RecentlyOrder />} />

        <Route path="/verify" element={<VerificationCode />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
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
