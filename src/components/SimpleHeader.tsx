/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { logo2 } from "../images";
type Props = {};
function SimpleHeader({}: Props) {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img className="pt-1 h-16 w-auto" src={logo2} />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default SimpleHeader;
