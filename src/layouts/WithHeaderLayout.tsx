import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/header/Header";

type Props = {};

const WithHeaderLayout = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header></Header>
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WithHeaderLayout;
