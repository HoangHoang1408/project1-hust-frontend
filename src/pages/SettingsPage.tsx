import { KeyIcon, UserCircleIcon } from "@heroicons/react/outline";
import { range } from "lodash";
import { useState } from "react";
import { classNames } from "../common/utilFunctions";
import ChangePassword from "../components/SettingsPage/ChangePassword";
import Profile from "../components/SettingsPage/Profile";

const subNavigation = [
  {
    name: "Hồ sơ",
    icon: UserCircleIcon,
    element: <Profile key={0} />,
  },
  {
    name: "Mật khẩu",
    icon: KeyIcon,
    element: <ChangePassword key={1} />,
  },
];

const tempState = range(subNavigation.length).map(() => false);
tempState[0] = true;
export default function Settings() {
  const [activeState, setActiveStates] = useState(tempState);
  return (
    <div>
      <div className="w-full h-56 bg-indigo-500"></div>
      <main className="relative -mt-36">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <h1 className="mb-5 text-white text-3xl font-bold">Settings</h1>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item, i) => (
                    <div
                      onClick={() => {
                        setActiveStates((pre) => {
                          const temp = range(pre.length).map(() => false);
                          temp[i] = true;
                          return temp;
                        });
                      }}
                      key={item.name}
                      className={classNames(
                        activeState[i]
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                      )}
                      aria-current={activeState[i] ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          activeState[i]
                            ? "text-indigo-500 group-hover:text-indigo-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </nav>
              </aside>
              {activeState.map((s, i) => s && subNavigation[i].element)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
