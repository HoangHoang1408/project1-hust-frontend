/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
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
