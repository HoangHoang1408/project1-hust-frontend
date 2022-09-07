import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userVar } from "../apollo/reactiveVar/loginStatus";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { UserRole } from "../graphql/generated/schema";

type Props = {};

const WithHeaderLayout = (props: Props) => {
  const user = useReactiveVar(userVar);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === UserRole.Admin) {
      navigate("/admin");
    }
  }, [user]);
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header></Header>
      <div className="grow bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WithHeaderLayout;
