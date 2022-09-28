import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CarTypeEnumBackEnd, PaymentBackEnd } from "../../common/enumConstants";
import { GetCarTypeQuery } from "../../graphql/generated/schema";
import {
  calcServicePrice,
  countRentingDay,
  RentingState,
} from "../../pages/BookingPage";
import { getFormatDate } from "./Step2";

type Props = {
  rentingState: RentingState;
  carTypeData?: GetCarTypeQuery;
};

const Step3: FC<Props> = ({ rentingState, carTypeData }) => {
  const navigate = useNavigate();
  const carType = carTypeData?.getCarType.carType;
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
    ) *
    (rentingState.quantity
      ? rentingState.quantity < 0
        ? 0
        : rentingState.quantity
      : 0);
  const carPrice =
    rentingDays * (carType?.price || 0) * (rentingState.quantity || 0);
  return (
    <Fragment>
      {carType && (
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg font-semibold">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="leading-6 pt-6 text-3xl font-bold text-center text-indigo-700"
                  >
                    Giữ xe thành công
                  </h2>
                  <div className="text-center mt-8 flex flex-col space-y-2 text-gray-700">
                    <h1 className="font-normal">Mã đặt xe của bạn:</h1>
                    <h1 className="text-indigo-700 text-lg">
                      {rentingState.rentingCode}
                    </h1>
                    <div className="font-normal ">
                      <h1>
                        Cảm ơn bạn đã sử dụng dịch vụ của công ty! Chúng tôi đã
                        tiếp nhận yêu cầu và giữ xe cho bạn. Bạn sẽ nhận được
                        hướng dẫn từ nhân viên của chúng tôi, vui lòng làm theo
                        hướng dẫn để hoàn thành đặt xe
                      </h1>
                    </div>
                    <div className="flex space-x-6 py-6 w-2/3 mx-auto">
                      <button
                        onClick={() => navigate("/")}
                        type="submit"
                        className={
                          "w-full h-10 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                        }
                      >
                        Trang chủ
                      </button>
                    </div>
                    <div className="bg-yellow-100 text-left p-4 rounded text-yellow-700">
                      <h1 className="font-bold text-xl">Lưu ý</h1>
                      <div className="p-2">
                        <li>
                          Nhớ chuẩn bị đầy đủ giấy tờ và tài sản đặt cọc thế
                          chấp theo yêu cầu để việc thuê xe được thuận lợi.
                        </li>
                        <li>
                          Đọc kỹ hợp đồng thuê xe và biên bản bàn giao xe của
                          Bên cho thuê xe.
                        </li>
                        <li>
                          Kiểm tra kỹ ngoại thất, nội thất và máy móc trong quá
                          trình nhận xe.
                        </li>
                        <li>
                          Khi xe đang vận hành, thường xuyên để ý đèn báo hiệu
                          trên bảng táp lô, nếu thấy đèn báo sự cố, hoặc xe có
                          hiện tượng khác thường phải dừng xe kiểm tra và gọi
                          điện thoại báo ngay cho Bên cho thuê xe để có hướng
                          dẫn cụ thể.
                        </li>
                        <li>
                          Trường hợp tự ý xử lý hoặc mang xe đi sửa mà không
                          thông báo hoặc chưa có sự đồng ý của Bên cho thuê, thì
                          sẽ phải chịu hoàn toàn trách nhiệm.
                        </li>
                        <li>
                          Nghiêm túc chấp hành luật giao thông đường bộ. Tự chịu
                          trách nhiệm dân sự, hình sự trong suốt thời gian thuê
                          xe. Trong trường hợp vi phạm luật giao thông đường bộ
                          và bị phạt nguội, bạn sẽ phải chịu hoàn toàn trách
                          nhiệm về khoản phí phạt phải nộp với cơ quan pháp
                          luật.
                        </li>
                        <li>
                          Chi phí thuê xe không bao gồm các chi phí tài xế, xăng
                          dầu, cầu phà, bến bãi,… trong quá trình thuê xe.
                        </li>
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
                Thông tin khách hàng
              </h2>
              <div className="mt-4 flex flex-col space-y-2">
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Họ và tên</h1>
                  <h1 className="col-span-2">{rentingState.name}</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Số điện thoại</h1>
                  <h1 className="col-span-2">{rentingState.phoneNumber}</h1>
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900 border-b border-b-gray-200 pb-1"
              >
                Chi tiết đặt xe
              </h2>
              <div className="mt-4 flex flex-col space-y-2">
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Trạng thái</h1>
                  <h1 className="col-span-2">Đã giữ xe</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Loại xe</h1>
                  <h1 className="col-span-2">
                    {CarTypeEnumBackEnd[rentingState.carType!]}
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Giao xe</h1>
                  <h1 className="col-span-2">{rentingState.deliveryAddress}</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Thời gian</h1>
                  <h1 className="col-span-2">
                    {`${rentingState.startTime} ${getFormatDate(
                      rentingState.startDate!
                    )}`}{" "}
                    →{" "}
                    {`${rentingState.endTime} ${getFormatDate(
                      rentingState.endDate!
                    )}`}{" "}
                  </h1>
                </div>

                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Thanh toán</h1>
                  <h1 className="col-span-2">
                    {PaymentBackEnd[rentingState.payment]}
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Ghi chú</h1>
                  <h1 className="col-span-2">{rentingState.note}</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-1">
                  <h1 className="col-span-1">Giá trị xe</h1>
                  <h1 className="col-span-2">
                    {servicePrice + carPrice}đ
                  </h1>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default Step3;
