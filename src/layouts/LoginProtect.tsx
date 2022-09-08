import { useReactiveVar } from "@apollo/client";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userVar } from "../apollo/reactiveVar/loginStatus";

type Props = {};

const LoginProtect = (props: Props) => {
  const user = useReactiveVar(userVar);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default LoginProtect;
