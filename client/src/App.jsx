import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../pages/HomePage";
import Signup from "./components/Signup";
import ProductList from "../pages/ProductList";
import CartPage from "../pages/CartPage";
import Signin from "./components/Signin";
import NotFoundPage from "../pages/NotFoundPage";
import DeliveryInfoPage from "../pages/DeliveryInfoPage";
import CustomNavbar from "./components/CustomNavbar";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import CreateProduct from "../pages/Admin/CreateProduct";
import DashboardLayout from "../Layout/DashboardLayout";
import DashBoard from "../pages/Admin/DashBoard";
import ManageProduct from "../pages/Admin/ManageProduct";
import Users from "../pages/Admin/Users";
import VerifyPage from "../pages/VerifyPage";
import OrdersPage from "../pages/OrderPage";
import ProtectedRoute from "../middleware/ProtectedRoute";
import ManageOrders from "../pages/Admin/ManageOrders";
import SearchResults from "../pages/SerachResults";
import SingleProduct from "../pages/SingleProduct";
import About from "../pages/About";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />

      {!isAdminRoute && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/delivery-info" element={<DeliveryInfoPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="users" element={<Users />} />
          <Route path="products/:productId/edit" element={<UpdateProduct />} />
          <Route path="manageProducts" element={<ManageProduct />} />
          <Route path="manageOrders" element={<ManageOrders />} />
          <Route path="" element={<DashBoard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
