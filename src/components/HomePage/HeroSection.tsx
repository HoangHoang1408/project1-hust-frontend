import { useReactiveVar } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { loginStatusVar } from "../../apollo/reactiveVar/loginStatus";
import { CarTypeEnumBackEnd } from "../../common/enumConstants";
import {
  CarTypeEnum,
  useCheckCarAvailableLazyQuery,
} from "../../graphql/generated/schema";
import { heroImage } from "../../images";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
import { FormInput } from "../form/FormInput";
import LoadingButton from "../form/LoadingButton";
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

interface CheckCarAvailableInput {
  carType: CarTypeEnum;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  quantity: number;
}
const checkCarAvailableInputSchema = yup.object().shape({
  carType: yup.string().required(),
  quantity: yup.number().required(),
});
export function getDate(startDate: Date, startTime: string): Date {
  return new Date(
    new Date(startDate).toISOString().split("T")[0] + "T" + startTime + ":00"
  );
}
export default function HeroSection() {
  const loginStatus = useReactiveVar(loginStatusVar);
  const navigate = useNavigate();
  const { register, handleSubmit, setError, getValues } =
    useForm<CheckCarAvailableInput>({
      defaultValues: {
        carType: CarTypeEnum.Seat4,
        quantity: 1,
        startTime: "07:00",
        endTime: "19:00",
      },
      mode: "onBlur",
      resolver: yupResolver(checkCarAvailableInputSchema),
    });
  const [checkCarAvailable, { loading }] = useCheckCarAvailableLazyQuery({
    onCompleted(data) {
      const {
        checkCarAvailable: { ok, available, error },
      } = data;
      if (error) {
        toast.error(error.message);
        return;
      }
      if (available) {
        const { carType, endDate, endTime, startDate, startTime, quantity } =
          getValues();
        navigate(`/renting`, {
          state: {
            carType,
            quantity: +quantity,
            startDate,
            endDate,
            startTime,
            endTime,
          },
        });
      } else {
        toast.info("Không tìm được xe phù hợp với yêu cầu");
      }
    },
    onError(err) {
      const msg = getApolloErrorMessage(err);
      if (msg) {
        toast.error(msg);
        return;
      }
      toast.error("Lỗi xảy ra, thử lại sau");
    },
  });
  const submitHandler = async () => {
    const { carType, endDate, endTime, startDate, startTime, quantity } =
      getValues();
    if (!loginStatus.isLoggedIn) {
      toast.warn("Đăng nhập trước khi thực hiện");
      return;
    }
    await checkCarAvailable({
      variables: {
        input: {
          carType,
          quantity: +quantity,
          startDate: getDate(startDate, startTime),
          endDate: getDate(endDate, endTime),
        },
      },
    });
  };
  return (
    <div className="relative bg-gray-50">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left flex justify-center lg:justify-start">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16 space-y-8 flex flex-col items-center md:items-start">
            <div className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl space-y-2">
              <h1 className="block xl:inline text-center">Car IT</h1>
              <h1 className="block text-2xl  sm:text-3xl text-indigo-600">
                Đồng hành cùng bạn trên mọi chặng đường
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-3 w-full lg:w-11/12 mt-4 bg-white shadow-md p-4 rounded-md"
            >
              <h1 className="text-center text-2xl font-bold text-indigo-700">
                Bạn cần thuê xe?
              </h1>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-start">
                  Loại xe
                </label>
                <div className="mt-1">
                  <select
                    {...register("carType")}
                    className="appearance-none block w-full px-2 py-1 border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 font-semibold"
                  >
                    {Object.values(CarTypeEnum).map((t, i) => (
                      <option key={i} value={t}>
                        {CarTypeEnumBackEnd[t]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-start">
                  Bắt đầu
                </label>
                <div className="mt-1 flex space-x-1">
                  <input
                    {...register("startDate")}
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="appearance-none block w-1/2 px-2 py-1 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></input>
                  <select
                    {...register("startTime")}
                    defaultValue={"07:00"}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 text-start">
                  Kết thúc
                </label>
                <div className="mt-1 flex space-x-1">
                  <input
                    {...register("endDate")}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    type="date"
                    className="appearance-none block w-1/2 px-2 py-1 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></input>
                  <select
                    {...register("endTime")}
                    defaultValue={"19:00"}
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
              <FormInput
                registerReturn={register("quantity")}
                id="quantity"
                labelText="Số lượng"
                defaultValue={1}
                type="number"
                errorMessage=""
              />
              <LoadingButton loading={loading} text="Tìm xe" />
            </form>
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 ">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={heroImage}
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
