import { ChangeEventHandler, FC } from "react";
const time = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
type Props = {
  labelText: string;
  hanldeDateChange: ChangeEventHandler<HTMLInputElement>;
  hanldeTimeChange: ChangeEventHandler<HTMLSelectElement>;
  defaultDate: string;
  defaultTime: string;
};

const TimeInput: FC<Props> = ({
  labelText,
  hanldeDateChange,
  hanldeTimeChange,
  defaultDate,
  defaultTime,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <div className="mt-1 flex space-x-1">
        <input
          onChange={hanldeDateChange}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          defaultValue={defaultDate}
          className="appearance-none block w-1/2 px-2 py-1 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></input>
        <select
          onChange={hanldeTimeChange}
          defaultValue={defaultTime}
          className="appearance-none block w-1/2 px-2 py-1 border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
        >
          {time.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeInput;
