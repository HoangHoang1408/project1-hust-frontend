import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUser } from "./hooks/useGetUser";
import WithHeaderLayout from "./layouts/WithHeaderLayout";
import WithSimpleHeaderLayout from "./layouts/WithSimpleHeaderLayout";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/auth/NotFoundPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignUpPage from "./pages/auth/SignUpPage";
function App() {
  useGetUser();
  return (
    <Fragment>
      <div className="w-screen min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<WithHeaderLayout />}>
            <Route index element={<HomePage />} />
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
    </Fragment>
  );
}

export default App;
