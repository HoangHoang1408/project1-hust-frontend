import { cloneDeep, range } from "lodash";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

/* This example requires Tailwind CSS v2.0+ */
const steps = [
  { id: "Bước 1", name: "Xem giá và thủ tục", status: "current" },
  { id: "Bước 2", name: "Thông tin khách hàng", status: "upcoming" },
  { id: "Bước 3", name: "Hoàn tất thanh toán", status: "upcoming" },
];
type Step = {
  id: string;
  name: string;
  status: string;
};
type Props = {
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
};
export const StepsProgress: FC<Props> = ({ stepNumber, setStepNumber }) => {
  const [stepsState, setStepsState] = useState<Step[]>(steps);
  const setStep = (i: number) => {
    const currentStep = stepsState.findIndex((s) => s.status === "current");
    if (currentStep === stepsState.length - 1) return;
    setStepsState((pre) => {
      const temp = cloneDeep<Step[]>(pre);
      range(i).forEach((e) => {
        temp[e].status = "complete";
      });
      temp[i].status = "current";
      range(i + 1, temp.length).forEach((e) => {
        temp[e].status = "upcoming";
      });
      return temp;
    });
    setStepNumber(i);
  };
  useEffect(() => {
    setStep(stepNumber);
  }, [stepNumber]);
  return (
    <nav
      className="max-w-3xl lg:max-w-7xl mx-auto sm:px-6"
      aria-label="Progress"
    >
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {stepsState.map((step, i) => (
          <li key={step.name} className="md:flex-1">
            {step.status === "complete" ? (
              <div
                onClick={() => {
                  setStep(i);
                }}
                className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 cursor-pointer"
              >
                <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 cursor-pointer"
                aria-current="step"
              >
                <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
