/* This example requires Tailwind CSS v2.0+ */
import { useReactiveVar } from "@apollo/client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { startCase, toLower } from "lodash";
import { Fragment, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, userVar } from "../../apollo/reactiveVar/loginStatus";
import { logo2 } from "../../images";
import MenuItem from "./Components/MenuItem";

type Props = {};

function Header({}: Props) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
    toast.info("Đã đăng xuất");
  }, []);
  const user = useReactiveVar(userVar);
  return (
    <Disclosure as="nav" className="bg-white shadow z-[999]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img className="pt-1 h-16 w-auto" src={logo2} />
                </Link>
                <div className="ml-4 flex items-center">
                  <div
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => setHover(false)}
                    className="grid place-items-center text-sm text-gray-900 font-semibold px-3 py-2 h-3/5 cursor-pointer hover:bg-indigo-200 transition relative rounded-md"
                  >
                    <h1>Xem xe</h1>
                    {hover && (
                      <div className="absolute top-[100%] left-1/2 w-max p-2 transform -translate-x-1/2 flex flex-col space-y-1 shadow z-[1000] bg-white">
                        <Link
                          to={"/cars/xe-4-cho"}
                          className="font-normal p-2 hover:bg-indigo-200 rounded"
                        >
                          Xe 4 chỗ
                        </Link>
                        <Link
                          to={"/cars/xe-5-cho"}
                          className="font-normal p-2 hover:bg-indigo-200 rounded"
                        >
                          Xe 5 chỗ
                        </Link>
                        <Link
                          to={"/cars/xe-7-cho"}
                          className="font-normal p-2 hover:bg-indigo-200 rounded"
                        >
                          Xe 7 chỗ
                        </Link>
                        <Link
                          to={"/cars/xe-12-cho"}
                          className="font-normal p-2 hover:bg-indigo-200 rounded"
                        >
                          Xe 12 chỗ
                        </Link>
                        <Link
                          to={"/cars/xe-16-cho"}
                          className="font-normal p-2 hover:bg-indigo-200 rounded"
                        >
                          Xe 16 chỗ
                        </Link>
                        <Link
                          to={"/cars/xe-hang-sang"}
                          className="font-normal p-2 hover:bg-indigo-200 rounded"
                        >
                          Xe hạng sang
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {!user && (
                  <div className="space-x-3">
                    <Link
                      to={"/auth/login"}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={"/auth/signup"}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng kí
                    </Link>
                  </div>
                )}
                {/* Profile dropdown */}
                {user && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pr-1">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatar?.fileUrl}
                          alt=""
                        />
                        <p className="text-base">
                          {startCase(toLower(user.name))}
                        </p>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem to="user/settings" title="Settings" />
                        <MenuItem to="user/renting" title="Đơn thuê" />
                        <MenuItem
                          to="/"
                          onClick={() => handleLogout()}
                          title="Đăng xuất"
                        />
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                {!user && (
                  <div className="space-x-3">
                    <Link
                      to={"/auth/login"}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={"/auth/signup"}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng kí
                    </Link>
                  </div>
                )}
                {user && (
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                )}
              </div>
            </div>
          </div>

          {user && (
            <Disclosure.Panel className="sm:hidden">
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar?.fileUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    onClick={() => navigate("user/settings")}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    onClick={() => navigate("user/settings")}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Đơn thuê
                  </Disclosure.Button>
                  <Disclosure.Button
                    onClick={() => handleLogout()}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}

export default Header;
