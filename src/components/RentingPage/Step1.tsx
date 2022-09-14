import { PlusIcon } from "@heroicons/react/solid";
import { cloneDeep } from "lodash";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { CarTypeEnumBackEnd, PaymentBackEnd } from "../../common/enumConstants";
import {
  GetCarTypeQuery,
  ServiceFragmentFragment,
  useCheckCarAvailableLazyQuery,
} from "../../graphql/generated/schema";
import { loadingWhite } from "../../images";
import {
  calcServicePrice,
  countRentingDay,
  RentingState,
} from "../../pages/BookingPage";
import { getDate } from "../HomePage/HeroSection";
import Loading from "../Loading";
import Step1Modal from "./Step1Modal";
import TimeInput from "./TimeInput";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  carTypeData?: GetCarTypeQuery;
  loadingCarType: boolean;
  rentingState: RentingState;
  setRentingState: Dispatch<SetStateAction<RentingState>>;
};
const Step1: FC<Props> = ({
  setStep,
  carTypeData,
  loadingCarType,
  rentingState,
  setRentingState,
}) => {
  const [
    checkCarAvailable,
    { loading: loadingCheck, error: checkError, data: checkData },
  ] = useCheckCarAvailableLazyQuery();
  const [quantityError, setQuantityError] = useState<string>();
  useEffect(() => {
    const { carType, endDate, endTime, quantity, startDate, startTime } =
      rentingState;
    checkCarAvailable({
      variables: {
        input: {
          carType: carType!,
          quantity: +quantity!,
          startDate: getDate(startDate!, startTime!),
          endDate: getDate(endDate!, endTime!),
        },
      },
    });
  }, [rentingState]);
  useEffect(() => {
    const quantity = rentingState.quantity;
    if (!quantity || quantity <= 0 || isNaN(quantity)) {
      setQuantityError("Số lượng xe không hợp lệ");
    } else {
      setQuantityError(undefined);
    }
  }, [rentingState.quantity]);
  const [openModal, setOpenModal] = useState(false);

  const nextStep = () => {
    const { deliveryAddress: address, quantity } = rentingState;
    if (!quantity || quantity <= 0 || isNaN(quantity)) {
      toast.error("Số lượng xe không hợp lệ");
      return;
    }
    if (!address || address.trim().length === 0) {
      toast.error("Nhập địa chỉ nhận xe");
      return;
    }
    setStep(1);
  };
  const rentingDays = countRentingDay(
    rentingState.startDate!,
    rentingState.endDate!,
    rentingState.startTime!,
    rentingState.endTime!
  );
  const servicePrice =
    calcServicePrice(
      rentingDays!,
      rentingState.rentingServices?.map((s) => ({
        perday: s.perDay,
        price: s.servicePrice,
      })) || []
    ) * (rentingState.quantity || 0); 
  const carType = carTypeData?.getCarType.carType;
  const carAvailable = checkData?.checkCarAvailable;
  return (
    <Fragment>
      {openModal && (
        <Step1Modal
          open={openModal}
          setClose={() => setOpenModal(false)}
          action={(s: ServiceFragmentFragment[]) =>
            setRentingState((pre) => {
              const temp = cloneDeep(pre);
              temp.rentingServices = s;
              return temp;
            })
          }
        />
      )}
      {loadingCarType && <Loading />}
      {!loadingCarType && carType && (
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg font-semibold">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Giá và thủ tục
                  </h2>
                  <div className="flex flex-col space-y-8 mt-8">
                    <div className="border-b border-b-gray-200 pb-4">
                      <h1 className="text-gray-700 text-3xl">Loại xe thuê</h1>
                      <h1 className="text-gray-500">
                        {CarTypeEnumBackEnd[carType.carType]}
                      </h1>
                      <h1 className="text-indigo-700 underline">
                        Xem thêm thông tin xe
                      </h1>
                    </div>
                    <div className="flex flex-col space-y-3 border-b border-b-gray-200 pb-4">
                      <h1 className="text-gray-700 text-3xl">Thủ tục</h1>
                      {carType.procedures.verificationPaper &&
                        carType.procedures.verificationPaper.length > 0 && (
                          <div className="">
                            <h1 className="text-gray-700 font-semibold text-lg">
                              Giấy tờ cần xác minh (công ty không giữ lại)
                            </h1>
                            <div className="text-gray-500">
                              {carType.procedures.verificationPaper?.map(
                                (e, i) => {
                                  return <h1 key={i}>{e}</h1>;
                                }
                              )}
                            </div>
                          </div>
                        )}
                      {carType.procedures.mortgatePaper &&
                        carType.procedures.mortgatePaper.length > 0 && (
                          <div>
                            <h1 className="text-gray-700 font-semibold text-lg">
                              Giấy tờ thế chấp (công ty giữ lại)
                            </h1>
                            <div className="text-gray-500">
                              {carType.procedures.mortgatePaper?.map((e, i) => {
                                return <h1 key={i}>{e}</h1>;
                              })}
                            </div>
                          </div>
                        )}
                      {carType.procedures.mortgateProperty &&
                        carType.procedures.mortgateProperty.length > 0 && (
                          <div>
                            <h1 className="text-gray-700 font-semibold text-lg">
                              Tài sản thế chấp (công ty giữ lại)
                            </h1>
                            <div className="text-gray-500">
                              {carType.procedures.mortgateProperty?.map(
                                (e, i) => {
                                  return <h1 key={i}>{e}</h1>;
                                }
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3 border-b border-b-gray-200 pb-4">
                      <h1 className="text-gray-700 text-3xl">Thanh toán</h1>
                      <div className="">
                        {carType.acceptedPayment.map((e, i) => {
                          return (
                            <h1 key={i} className="text-gray-500 font-semibold">
                              {PaymentBackEnd[e]}
                            </h1>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3 pb-4">
                      <h1 className="text-gray-700 text-3xl">
                        Giới hạn quãng đường
                      </h1>
                      <div className="">
                        <h1 className="text-gray-500 font-semibold">
                          Tối đa {carType.maxDistance}km/ngày
                        </h1>
                        <h1 className="text-gray-500 font-semibold ">
                          Phụ trội {carType.additionalDistancePrice}đ/km
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1 flex flex-col space-y-4"
          >
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Giao xe
              </h2>
              <div className="mt-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ nhận xe
                </label>
                <div className="mt-1">
                  <input
                    onBlur={(e) =>
                      setRentingState((pre) => ({
                        ...pre,
                        deliveryAddress: e.target.value,
                      }))
                    }
                    defaultValue={rentingState.deliveryAddress}
                    id="address"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="bg-indigo-200 p-3 mt-4 rounded">
                <h1>
                  Phí giao nhận xe tại địa chỉ khách hàng sẽ được tính theo:
                </h1>
                <h1>- Dưới 5 km: 50/lượt</h1>
                <h1>- Trên 5km : 10vnđ/Km</h1>
              </div>
            </div>
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex flex-col space-y-3">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Thời gian thuê và số lượng
              </h2>
              <div className="flex flex-col space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số lượng xe
                  </label>
                  <div className="mt-1 flex space-x-1">
                    <input
                      onChange={(e) => {
                        setRentingState((pre) => ({
                          ...pre,
                          quantity: +e.target.value,
                        }));
                      }}
                      type="number"
                      defaultValue={rentingState.quantity}
                      className="appearance-none block w-full px-2 py-1 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></input>
                  </div>
                </div>
                <TimeInput
                  labelText="Bắt đầu"
                  defaultDate={
                    new Date(rentingState?.startDate!)
                      .toISOString()
                      .split("T")[0]
                  }
                  defaultTime={rentingState?.startTime!}
                  hanldeDateChange={(e) => {
                    setRentingState((pre) => ({
                      ...pre,
                      startDate: new Date(e.target.value),
                    }));
                  }}
                  hanldeTimeChange={(e) => {
                    setRentingState((pre) => ({
                      ...pre,
                      startTime: e.target.value,
                    }));
                  }}
                />
                <TimeInput
                  labelText="Kết thúc"
                  defaultDate={
                    new Date(rentingState?.endDate!).toISOString().split("T")[0]
                  }
                  defaultTime={rentingState?.endTime!}
                  hanldeDateChange={(e) => {
                    setRentingState((pre) => ({
                      ...pre,
                      endDate: new Date(e.target.value),
                    }));
                  }}
                  hanldeTimeChange={(e) => {
                    setRentingState((pre) => ({
                      ...pre,
                      endTime: e.target.value,
                    }));
                  }}
                />
                {/* show result after checking */}
                <div className="mt-4">
                  {quantityError && (
                    <div className="bg-red-200 rounded text-red-500 p-3">
                      {quantityError}
                    </div>
                  )}
                  {(checkError || carAvailable?.error) && (
                    <div className="bg-red-200 rounded text-red-500 p-3">
                      {carAvailable?.error?.message ||
                        "Đã xảy ra lỗi, thử lại sau"}
                    </div>
                  )}
                  {!quantityError && carAvailable?.available && (
                    <div className="bg-green-200 rounded text-green-500 p-3">
                      Có xe để cho thuê
                    </div>
                  )}
                  {!carAvailable?.available &&
                    !loadingCheck &&
                    !carAvailable?.error && (
                      <div className="bg-red-200 rounded text-red-500 p-3">
                        Không còn xe để thuê trong khoảng thời gian ngày
                      </div>
                    )}
                  {loadingCheck && (
                    <div className="bg-gray-100 flex justify-center">
                      <img
                        className="w-12 h-12"
                        src={loadingWhite}
                        alt="loading"
                      />
                    </div>
                  )}
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
                <div
                  onClick={() => setOpenModal(true)}
                  className="bg-indigo-200 py-1 rounded flex items-center justify-center cursor-pointer hover:bg-indigo-300 space-x-1 text-base"
                >
                  <PlusIcon className="w-6" />
                  <h1>Lựa chọn dịch vụ</h1>
                </div>

                {rentingState.rentingServices && (
                  <Fragment>
                    <div className="flex justify-between text-base border-t pt-3 border-t-gray-300">
                      <h1>Thời gian: </h1>
                      <h1>{rentingDays} ngày</h1>
                    </div>
                    <div className="flex justify-between text-base">
                      <h1>Số lượng xe: </h1>
                      <h1>{rentingState.quantity} xe</h1>
                    </div>
                    <div className="flex justify-between font-semibold text-base border-t pt-2 border-t-gray-300">
                      <h1>Tổng tiền dịch vụ: </h1>
                      <h1>{servicePrice}đ</h1>
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
                  <h1>Giá xe</h1>
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
                  <h1>Tổng tiền xe</h1>
                  <h1>
                    {carType.price * rentingState.quantity! * rentingDays}đ
                  </h1>
                </div>
                {rentingState.rentingServices && (
                  <div className="flex justify-between">
                    <h1>Tổng tiền dịch vụ</h1>
                    <h1>{servicePrice}đ</h1>
                  </div>
                )}

                <div className="border border-gray-200 mt-4 mb-2"></div>
                <div className="flex justify-between font-semibold">
                  <h1>Tổng</h1>
                  <h1>
                    {carType.price * rentingState.quantity! * rentingDays +
                      servicePrice}
                    đ
                  </h1>
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-stretch">
                <button
                  onClick={() => nextStep()}
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default Step1;
