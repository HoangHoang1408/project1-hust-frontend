import { FC, useEffect, useState } from "react";

type Props = {
  text?: string;
  setText: (value?: string) => void;
  labelText: string;
  className?: string;
};
const TextSearchInput: FC<Props> = ({
  text,
  setText,
  labelText,
  className,
}) => {
  const [value, setValue] = useState(text);
  useEffect(() => {
    const timer = setTimeout(() => {
      setText(value || undefined);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="text-gray-700 font-medium">{labelText}</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={"text"}
        className={
          "appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " +
            className || ""
        }
      ></input>
    </div>
  );
};
export default TextSearchInput;
