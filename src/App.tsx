import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUser } from "./hooks/useGetUser";
import AdminLayout from "./layouts/AdminLayout";
import LoginProtect from "./layouts/LoginProtect";
import WithHeaderLayout from "./layouts/WithHeaderLayout";
import WithSimpleHeaderLayout from "./layouts/WithSimpleHeaderLayout";
import { AdminBookingDetail } from "./pages/admin/AdminBookingDetail";
import { default as AdminCarDetail } from "./pages/admin/AdminCarDetail";
import BookingManager from "./pages/admin/BookingManager";
import CarManager from "./pages/admin/CarManager";
import CreateCar from "./pages/admin/CreateCar";
import TestTable from "./pages/admin/ForecastTable";
import UpdateCar from "./pages/admin/UpdateCar";
import UserManager from "./pages/admin/UserMangager";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/auth/NotFoundPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignUpPage from "./pages/auth/SignUpPage";
import RentingPage from "./pages/BookingPage";
import Seat12Car from "./pages/carView/12SeatCar";
import Seat16Car from "./pages/carView/16SeatCar";
import Seat4Car from "./pages/carView/4SeatCar";
import Seat5Car from "./pages/carView/5SeatCar";
import Seat7Car from "./pages/carView/7SeatCar";
import CarDetail from "./pages/carView/CarDetail";
import LuxuryCar from "./pages/carView/LuxuryCar";
import PickUpTruck from "./pages/carView/PickupTruck";
import HomePage from "./pages/HomePage";
import Settings from "./pages/SettingsPage";
import UserRenting from "./pages/UserBooking";
function App() {
  useGetUser();
  return (
    <div className="transition">
      <div className="w-screen min-h-screen flex flex-col justify-between">
        <Routes>
          {/* customer routes */}
          <Route path="/" element={<WithHeaderLayout />}>
            <Route index element={<HomePage />} />
            <Route path="cars">
              <Route path=":id" element={<CarDetail />} />
              <Route path="xe-4-cho" element={<Seat4Car />} />
              <Route path="xe-5-cho" element={<Seat5Car />} />
              <Route path="xe-7-cho" element={<Seat7Car />} />
              <Route path="xe-12-cho" element={<Seat12Car />} />
              <Route path="xe-16-cho" element={<Seat16Car />} />
              <Route path="xe-ban-tai" element={<PickUpTruck />} />
              <Route path="xe-hang-sang" element={<LuxuryCar />} />
            </Route>

            {/* require-login routes */}
            <Route element={<LoginProtect />}>
              <Route path="renting" element={<RentingPage />} />
              <Route path="user">
                <Route path="settings" element={<Settings />} />
                <Route path="renting" element={<UserRenting />} />
              </Route>
              <Route path="bookings/:id" element={<AdminBookingDetail />} />
            </Route>
          </Route>

          {/* auth routes */}
          <Route element={<LoginProtect />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<BookingManager />} />
              <Route path="bookings">
                <Route path="forecast" element={<TestTable />} />
                <Route path=":id" element={<AdminBookingDetail />} />
              </Route>
              <Route path="cars">
                <Route index element={<CarManager />} />
                <Route path="create" element={<CreateCar />} />
                <Route path="update/:id" element={<UpdateCar />} />
                <Route path=":id" element={<AdminCarDetail />} />
              </Route>
              <Route path="users" element={<UserManager />} />
            </Route>
          </Route>

          {/* auth routes */}
          <Route path="/auth" element={<WithSimpleHeaderLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="forgotPassword" element={<ForgotPasswordPage />} />
            <Route
              path="forgotPassword/changePassword"
              element={<ResetPasswordPage />}
            />
          </Route>

          {/* handle notfound */}
          <Route path="*" element={<Navigate to="/notfound" replace />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer closeOnClick autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
