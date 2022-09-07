import { Menu } from "@headlessui/react";
import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../../common/utilFunctions";

type Props = {
  onClick?: MouseEventHandler;
  title: string;
  to: string;
};

const MenuItem: FC<Props> = ({ onClick, title, to }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={to}
          onClick={onClick}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
          )}
        >
          {title}
        </Link>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
