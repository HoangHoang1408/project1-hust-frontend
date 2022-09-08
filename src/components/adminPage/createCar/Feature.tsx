import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { cloneDeep } from "lodash";
import { FC, useEffect, useState } from "react";
const Features: FC<{
  setValues: (v: string[]) => void;
  errorMessage?: string;
  defaultFeatures?: string[];
}> = ({ setValues, errorMessage, defaultFeatures }) => {
  const [features, setFeatures] = useState<string[]>([""]);
  useEffect(() => {
    setValues(features.map((v) => v.trim()).filter((v) => v.length > 0));
  }, [features]);
  useEffect(() => {
    if (defaultFeatures) setFeatures(defaultFeatures);
  }, [defaultFeatures]);
  return (
    <div className="border-b-2 border-gray-200 pb-8">
      <h1 className="font-semibold text-indigo-700">Tính năng</h1>
      <div className="pl-4">
        {features.map((e, i) => (
          <div
            key={i}
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5"
          >
            <label
              htmlFor={"hello"}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Tính năng {i + 1}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2 flex items-center space-x-3">
              <div className="max-w-lg grow rounded-md shadow-sm">
                <input
                  onChange={(e) =>
                    setFeatures((pre) => {
                      const temp = cloneDeep(pre);
                      temp[i] = e.target.value;
                      return temp;
                    })
                  }
                  value={features[i]}
                  id={"hello"}
                  className="flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2"
                />
              </div>
              <div className="h-7 w-7 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center">
                <XIcon
                  onClick={() => {
                    setFeatures((pre) =>
                      cloneDeep(pre).filter((a, t) => t !== i)
                    );
                  }}
                  className="h-6 w-6  text-indigo-700 "
                />
              </div>
            </div>
          </div>
        ))}
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start mt-1 flex">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"></label>
          <span className="text-xs text-red-500">{errorMessage}</span>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 flex place-items-center">
          <label
            htmlFor={"hello"}
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          ></label>
          <div
            onClick={() => {
              setFeatures((pre) => {
                const temp = cloneDeep(pre);
                temp.push("");
                return temp;
              });
            }}
            className="mt-1 sm:mt-0 sm:col-span-2 w-full"
          >
            <div className="max-w-lg flex bg-gray-100 rounded-md shadow-sm w-full justify-center p-1 cursor-pointer hover:bg-gray-200">
              <PlusIcon className="w-8 h-8 text-indigo-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Features;
