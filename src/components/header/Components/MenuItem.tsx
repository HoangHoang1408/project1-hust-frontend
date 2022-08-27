import { Menu } from "@headlessui/react";
import { FC, MouseEventHandler } from "react";
import { classNames } from "../Header";

type Props = {
  onClick?: MouseEventHandler;
  title: string;
};

const MenuItem: FC<Props> = ({ onClick, title }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={onClick}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
          )}
        >
          {title}
        </div>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
