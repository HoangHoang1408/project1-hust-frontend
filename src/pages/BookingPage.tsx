import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDate } from "../components/HomePage/HeroSection";
import Step1 from "../components/RentingPage/Step1";
import Step2 from "../components/RentingPage/Step2";
import Step3 from "../components/RentingPage/Step3";
import { StepsProgress } from "../components/RentingPage/StepsProgress";
import {
  CarTypeEnum,
  Payment,
  ServiceFragmentFragment,
  useGetCarTypeLazyQuery,
} from "../graphql/generated/schema";
export interface RentingState {
  carType?: CarTypeEnum;
  quantity?: number;
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  deliveryAddress?: string;
  name: string;
  phoneNumber: string;
  note?: string;
  payment: Payment;
  rentingCode?: string;
  rentingServices?: ServiceFragmentFragment[];
}
export const countRentingDay = (
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string
) => {
  const start = getDate(startDate, startTime).getTime();
  const end = getDate(endDate, endTime).getTime();
  return Math.round(((end - start) * 2) / 86400000) / 2;
};
export const calcServicePrice = (
  numOfDays: number,
  services: { price: number; perday: boolean }[]
) => {
  return services.reduce(
    (pre, c) => pre + c.price * (c.perday ? numOfDays : 1),
    0
  );
};
export default function RentingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [rentingState, setRentingState] = useState<RentingState>(
    location.state as RentingState
  );
  const [getCarType, { data, loading: loadingCarType }] =
    useGetCarTypeLazyQuery({
      onError(err) {
        navigate("/");
        toast.error("Xảy ra lỗi, thử lại sau");
      },
    });
  useEffect(() => {
    const state = location.state as RentingState;
    getCarType({
      variables: {
        input: {
          carType: state.carType!,
        },
      },
    });
  }, [location.state]);
  return (
    <div className="min-h-full">
      <main className="py-10">
        <StepsProgress stepNumber={step} setStepNumber={setStep} />
        {step === 0 && (
          <Step1
            carTypeData={data}
            loadingCarType={loadingCarType}
            setStep={setStep}
            rentingState={rentingState}
            setRentingState={setRentingState}
          />
        )}
        {step === 1 && (
          <Step2
            rentingState={rentingState}
            setStep={setStep}
            carTypeData={data}
            setRentingState={setRentingState}
          />
        )}
        {step === 2 && <Step3 rentingState={rentingState} carTypeData={data} />}
      </main>
    </div>
  );
}
