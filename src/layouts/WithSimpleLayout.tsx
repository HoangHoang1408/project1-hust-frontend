import { FC } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const WithSimpleLayout: FC<Props> = (props) => {
  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <Outlet></Outlet>
    </div>
  );
};

export default WithSimpleLayout;
