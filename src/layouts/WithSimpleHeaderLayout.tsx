type Props = {};
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SimpleHeader from "../components/SimpleHeader";
function WithSimpleHeaderLayout({}: Props) {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <SimpleHeader></SimpleHeader>
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default WithSimpleHeaderLayout;
