import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUser } from "./hooks/useGetUser";
import AdminLayout from "./layouts/AdminLayout";
import WithHeaderLayout from "./layouts/WithHeaderLayout";
import WithSimpleHeaderLayout from "./layouts/WithSimpleHeaderLayout";
import WithSimpleLayout from "./layouts/WithSimpleLayout";
import { AdminBookingDetail } from "./pages/admin/AdminBookingDetail";
import { default as AdminCarDetail } from "./pages/admin/AdminCarDetail";
import BookingManager from "./pages/admin/BookingManager";
import CarManager from "./pages/admin/CarManager";
import CreateCar from "./pages/admin/CreateCar";
import UserManager from "./pages/admin/UserMangager";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/auth/NotFoundPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignUpPage from "./pages/auth/SignUpPage";
import RentingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import Settings from "./pages/SettingsPage";
import TestTable from "./pages/TestTable";
import UserRenting from "./pages/UserBooking";
function App() {
  useGetUser();
  return (
    <div className="transition">
      <div className="w-screen min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<WithHeaderLayout />}>
            <Route index element={<HomePage />} />
            <Route path="renting" element={<RentingPage />} />
            <Route path="user">
              <Route path="settings" element={<Settings />} />
              <Route path="renting" element={<UserRenting />} />
            </Route>
            <Route path="bookings/:id" element={<AdminBookingDetail />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<BookingManager />} />
            <Route path="bookings/:id" element={<AdminBookingDetail />} />
            <Route path="cars" element={<CarManager />} />
            <Route path="cars/create" element={<CreateCar />} />
            <Route path="cars/:id" element={<AdminCarDetail />} />
            <Route path="users" element={<UserManager />} />
          </Route>
          <Route path="/" element={<WithSimpleLayout />}>
            <Route path="/test-table" element={<TestTable />} />
          </Route>
          <Route path="/auth" element={<WithSimpleHeaderLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="forgotPassword" element={<ForgotPasswordPage />} />
            <Route
              path="forgotPassword/changePassword"
              element={<ResetPasswordPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/notfound" replace />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer closeOnClick autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
