import { useReactiveVar } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, FC, Fragment, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userVar } from "../../apollo/reactiveVar/loginStatus";
import { CarTypeEnumBackEnd } from "../../common/enumConstants";
import {
  GetCarTypeQuery,
  Payment,
  useCreateBookingMutation,
} from "../../graphql/generated/schema";
import { loadingWhite } from "../../images";
import {
  calcServicePrice,
  countRentingDay,
  RentingState,
} from "../../pages/BookingPage";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
import { getDate } from "../HomePage/HeroSection";
export enum PaymentBackEnd {
  BEFORE = "Trả trước",
  AFTER = "Trả sau",
  BANK_TRANSFER = "Chuyển khoản",
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
type Props = {
  rentingState: RentingState;
  setStep: Dispatch<SetStateAction<number>>;
  setRentingState: Dispatch<SetStateAction<RentingState>>;
  carTypeData?: GetCarTypeQuery;
};
type Step2InputForm = {
  name: string;
  phoneNumber: string;
  note?: string;
  payment: Payment;
};
const Step2InputSchema = yup.object().shape({
  name: yup.string().required("Không được để trống"),
  phoneNumber: yup.string().required("Không được để trống"),
  note: yup.string(),
  payment: yup.string().required("Không được để trống"),
});
export const getFormatDate = (date: Date) => {
  const t = new Date(date);
  return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
};
const Step2: FC<Props> = ({
  setStep,
  rentingState,
  carTypeData,
  setRentingState,
}) => {
  const navigate = useNavigate();
  const user = useReactiveVar(userVar);
  const carType = carTypeData?.getCarType.carType;
  const rentingDays = countRentingDay(
    rentingState.startDate!,
    rentingState.endDate!,
    rentingState.startTime!,
    rentingState.endTime!
  );
  useEffect(() => {
    if (!user) {
      toast.info("Vui lòng đăng nhập và tiếp tục!");
      navigate("/");
    }
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Step2InputForm>({
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
    },
    resolver: yupResolver(Step2InputSchema),
    mode: "onBlur",
  });
  const [createBooking, { loading }] = useCreateBookingMutation({
    onError(error) {
      const temp = getApolloErrorMessage(error);
      if (temp) {
        toast.error(temp);
        return;
      }
      toast.error("Có lỗi xảy ra, thử lại sau");
    },
  });
  const submitHandler = async () => {
    const { name, payment, phoneNumber, note } = getValues();
    if (!phoneRegExp.test(phoneNumber)) {
      setError("phoneNumber", {
        message: "Số điện thoại không đúng định dạng",
      });
      return;
    }
    setRentingState((pre) => ({
      ...pre,
      name,
      payment,
      phoneNumber,
      note,
    }));
    const {
      carType,
      endDate,
      endTime,
      quantity,
      startDate,
      startTime,
      deliveryAddress,
      rentingServices,
    } = rentingState;
    await createBooking({
      variables: {
        input: {
          carTypeName: carType!,
          homeDelivery: deliveryAddress!,
          quantity: quantity!,
          startDate: getDate(startDate!, startTime!),
          endDate: getDate(endDate!, endTime!),
          customerName: name,
          customerPhone: phoneNumber,
          payment,
          note,
          serviceIds: rentingServices?.map((s) => s.id),
        },
      },
      onCompleted(data) {
        const { createBooking } = data;
        if (createBooking.error) {
          toast.error(createBooking.error.message);
          return;
        }
        setRentingState((pre) => ({
          ...pre,
          name,
          payment,
          phoneNumber,
          note,
          rentingCode: createBooking.bookingCode!,
        }));
        setStep(2);
      },
    });
  };
  return (
    <Fragment>
      {carType && (
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="lg:col-start-1 lg:col-span-1 flex flex-col space-y-4">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Thông tin đặt xe
              </h2>
              <div className="mt-4 flex flex-col space-y-3">
                <div>
                  <h1 className="text-base text-gray-900 font-semibold">
                    Loại xe thuê
                  </h1>
                  <h1 className="text-gray-700">
                    {CarTypeEnumBackEnd[carType.carType]}
                  </h1>
                </div>
                <div className="">
                  <h1 className="text-base text-gray-900 font-semibold">
                    Địa điểm giao xe
                  </h1>
                  <h1 className="text-gray-700">
                    {rentingState.deliveryAddress}
                  </h1>
                </div>
                <div>
                  <h1 className="text-base text-gray-900 font-semibold">
                    Thời gian thuê
                  </h1>
                  <h1 className="text-gray-700">
                    {`${rentingState.startTime} ${getFormatDate(
                      rentingState.startDate!
                    )}`}{" "}
                    →{" "}
                    {`${rentingState.endTime} ${getFormatDate(
                      rentingState.endDate!
                    )}`}{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex flex-col space-y-3">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Dịch vụ kèm theo
              </h2>
              <div className="flex flex-col space-y-2 text-sm text-gray-700">
                {rentingState.rentingServices && (
                  <div className="p-2 rounded">
                    <div>
                      <div className="grid grid-cols-12 gap-1 font-semibold text-indigo-700">
                        <div className="col-span-8">Tên dịch vụ</div>
                        <div className="col-span-4">Giá thành</div>
                      </div>
                      <div className="w-4 h-1"></div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {rentingState.rentingServices.map((e, i) => (
                        <div key={i} className="flex space-x-2">
                          <div className="grid gap-1 grid-cols-12 grow">
                            <div className="col-span-8">{e.serviceName}</div>
                            <div className="col-span-4">
                              {e.servicePrice}đ {e.perDay ? "/ngày" : "/lượt"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {rentingState.rentingServices && (
                  <Fragment>
                    <div className="flex justify-between text-base border-t pt-3 border-t-gray-300">
                      <h1>Thời gian: </h1>
                      <h1>{rentingDays} ngày</h1>
                    </div>
                    <div className="flex justify-between font-semibold text-base">
                      <h1>Tổng tiền dịch vụ: </h1>
                      <h1>
                        {calcServicePrice(
                          rentingDays!,
                          rentingState.rentingServices.map((s) => ({
                            perday: s.perDay,
                            price: s.servicePrice,
                          }))
                        )}
                        đ
                      </h1>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Chi tiết giá
              </h2>
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex justify-between">
                  <h1>Đơn giá</h1>
                  <h1>{carType.price}đ</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Thời gian thuê</h1>
                  <h1>x{rentingDays} ngày</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Số lượng xe</h1>
                  <h1>x{rentingState.quantity} xe</h1>
                </div>
                <div className="flex justify-between border-t border-t-gray-200 pt-2">
                  <h1>Tạm tính</h1>
                  <h1>
                    {carType.price * rentingState.quantity! * rentingDays}đ
                  </h1>
                </div>
                {rentingState.rentingServices && (
                  <div className="flex justify-between">
                    <h1>Tiền dịch vụ</h1>
                    <h1>
                      {calcServicePrice(
                        rentingDays!,
                        rentingState.rentingServices.map((s) => ({
                          perday: s.perDay,
                          price: s.servicePrice,
                        }))
                      )}
                      đ
                    </h1>
                  </div>
                )}

                <div className="border border-gray-200 mt-4 mb-2"></div>
                <div className="flex justify-between font-semibold">
                  <h1>Tổng</h1>
                  <h1>
                    {carType.price * rentingState.quantity! * rentingDays +
                      (rentingState.rentingServices
                        ? calcServicePrice(
                            rentingDays!,
                            rentingState.rentingServices.map((s) => ({
                              perday: s.perDay,
                              price: s.servicePrice,
                            }))
                          )
                        : 0)}
                    đ
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:col-start-2 lg:col-span-2">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 h-full">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Thông tin khách hàng
              </h2>
              <div className="mt-4">
                <h1 className="font-semibold text-gray-700 text-lg">
                  Thông tin dùng để đặt xe
                </h1>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col  space-y-4 mt-4"
                >
                  <div className="grid grid-cols-12">
                    <label htmlFor="" className="col-span-5 self-center pl-4">
                      Họ tên:
                    </label>
                    <div className="col-span-7">
                      <input
                        {...register("name")}
                        className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      ></input>
                      <p className="text-xs text-red-500 pt-[2px] h-3">
                        {errors.name?.message}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <label htmlFor="" className="col-span-5 self-center pl-4">
                      Số điện thoại:
                    </label>
                    <div className="col-span-7">
                      <input
                        type={"tel"}
                        {...register("phoneNumber")}
                        className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      ></input>
                      <p className="text-xs text-red-500 pt-[2px] h-3">
                        {errors.phoneNumber?.message}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <label htmlFor="" className="col-span-5 self-center pl-4">
                      Ghi chú:
                    </label>
                    <div className="col-span-7">
                      <textarea
                        {...register("note")}
                        className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <label htmlFor="" className="col-span-5 self-center pl-4">
                      Thanh toán
                    </label>
                    <div className="col-span-7">
                      <select
                        {...register("payment")}
                        className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {carType.acceptedPayment.map((p, i) => (
                          <option key={i} value={p}>
                            {PaymentBackEnd[p]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-3 justify-center pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={
                        "w-32 self-center h-10 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                      }
                    >
                      {!loading && <p>Đặt xe</p>}
                      {loading && (
                        <img className="w-8 h-8" src={loadingWhite} />
                      )}
                    </button>
                    <button
                      onClick={() => setStep(0)}
                      type="submit"
                      className={
                        "w-32 self-center h-10 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                      }
                    >
                      Trở lại
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Step2;
