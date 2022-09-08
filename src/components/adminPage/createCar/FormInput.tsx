import { FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
const FormInput: FC<{
  id: string;
  labelText: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  registerReturn?: UseFormRegisterReturn;
}> = ({ id, labelText, errorMessage, registerReturn, type }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {labelText}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex flex-col rounded-md">
          <input
            {...registerReturn}
            type={type}
            id={id}
            className="flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2"
          />
          <span className="text-xs text-red-500 mt-1">{errorMessage}</span>
        </div>
      </div>
    </div>
  );
};
export default FormInput;
