import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WithSimpleHeaderLayout from "./layouts/WithSimpleHeaderLayout";
import HomePage from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/auth/NotFoundPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between">
      <Routes>
        <Route path="/*" element={<Header />} />
        <Route path="/notfound" />
        <Route path="/auth/*" />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<WithSimpleHeaderLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="resetPassword" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/notfound" replace />} />
        <Route path="/notfound" element={<NotFoundPage />} />
      </Routes>
      <Routes>
        <Route path="/*" element={<Footer />} />
        <Route path="/notfound" />
        <Route path="/auth/*" />
      </Routes>
    </div>
  );
}

export default App;
