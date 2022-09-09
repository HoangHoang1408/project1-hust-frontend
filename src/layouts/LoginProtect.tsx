import { useReactiveVar } from "@apollo/client";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { loginStatusVar, userVar } from "../apollo/reactiveVar/loginStatus";

type Props = {};

const LoginProtect = (props: Props) => {
  const user = useReactiveVar(userVar);
  const loginStatus = useReactiveVar(loginStatusVar);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginStatus && !loginStatus.isLoggedIn) {
      navigate("/");
    }
  }, [loginStatus]);
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default LoginProtect;
