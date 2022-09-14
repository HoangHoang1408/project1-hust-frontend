import { useReactiveVar } from "@apollo/client";
import { CurrencyDollarIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import {
  TableIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { cloneDeep } from "lodash";
import { Fragment, SVGProps, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { userVar } from "../apollo/reactiveVar/loginStatus";
import DesktopSidebar from "../components/adminPage/DesktopSidebar";
import MobileSideBar from "../components/adminPage/MobileSideBar";
import { UserRole } from "../graphql/generated/schema";
const navigation = [
  {
    routes: ["/admin", "/admin/rentings", RegExp("/admin/rentings/*")],
    name: "Quản lí đơn thuê",
    icon: TableIcon,
    current: true,
  },
  {
    routes: ["/admin/users"],
    name: "Quản lí người dùng",
    icon: UserGroupIcon,
    current: false,
  },
  {
    routes: ["/admin/cars", RegExp("/admin/cars/*")],
    name: "Quản lí xe",
    icon: TruckIcon,
    current: false,
  },
  {
    routes: ["/admin/cartypes", RegExp("/admin/cartypes/*")],
    name: "Quản lí loại xe",
    icon: TagIcon,
    current: false,
  },
  {
    routes: ["/admin/services", RegExp("/admin/services/*")],
    name: "Quản lí dịch vụ",
    icon: CurrencyDollarIcon,
    current: false,
  },
];

export type NavState = {
  routes: (string | RegExp)[];
  name: string;
  icon: (p: SVGProps<SVGSVGElement>) => JSX.Element;
  current: boolean;
};
const AdminLayout = () => {
  const user = useReactiveVar(userVar);
  const location = useLocation();
  const navigate = useNavigate();
  const [navState, setNavState] = useState<NavState[]>(navigation);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (user && user.role !== UserRole.Admin) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    const index = navState.findIndex((s) =>
      s.routes
        .map((v) => {
          if (v instanceof RegExp) return (x: string) => v.test(x);
          return (x: string) => v === x;
        })
        .some((f) => f(location.pathname))
    );
    if (index === -1) return;
    setNavState((pre) => {
      const newState = cloneDeep(pre);
      newState.forEach((s) => (s.current = false));
      newState[index].current = true;
      return newState;
    });
  }, [location]);
  return (
    <Fragment>
      <div className="min-h-full">
        <MobileSideBar
          navState={navState}
          setNavState={setNavState}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <DesktopSidebar navState={navState} setNavState={setNavState} />
        <div className="lg:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
export default AdminLayout;
