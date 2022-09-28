/* This example requires Tailwind CSS v2.0+ */
import { StarIcon } from "@heroicons/react/solid";
import { range } from "lodash";
import { FC, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BookingStatusBackEnd,
  CarTypeEnumBackEnd,
} from "../common/enumConstants";
import LoadingButton from "../components/form/LoadingButton";
import Loading from "../components/Loading";
import { PaymentBackEnd } from "../components/RentingPage/Step2";
import {
  BookingStatus,
  useBookingDetailQuery,
  useBookingFeedbackMutation,
  useUpdateBookingStatusMutation,
} from "../graphql/generated/schema";
import { getApolloErrorMessage } from "../utils/getApolloErrorMessage";

type RowProps = {
  title: string;
  value: string | number;
};

const InforRow: FC<RowProps> = ({ title, value }) => {
  return (
    <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
};
type Props = {};
export const BookingDetail: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [feedbackState, setFeedbackState] = useState<{
    text: string;
    star: number;
  }>({ star: 5, text: "" });
  const { data, loading } = useBookingDetailQuery({
    variables: {
      input: {
        bookingId: params.id!,
      },
    },
    onCompleted(data) {
      const { getBookingDetail } = data;
      if (getBookingDetail.error) {
        toast.error(getBookingDetail.error.message);
        navigate("/notfound");
      }
    },
    onError(err) {
      const msg = getApolloErrorMessage(err);
      if (msg) {
        toast.error(msg);
      } else {
        toast.error("Lỗi xảy ra, thử lại sau");
      }
      navigate("/");
    },
  });
  const booking = data?.getBookingDetail.booking;
  const [feedback, { loading: feedbackLoading }] = useBookingFeedbackMutation({
    onCompleted(data) {
      const { bookingFeedback } = data;
      if (bookingFeedback.error) {
        toast.error(bookingFeedback.error.message);
        return;
      }
      if (bookingFeedback.ok) toast.success("Đã gửi phản hồi");
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
  const [updateBooking, { loading: updateStatusLoading }] =
    useUpdateBookingStatusMutation({
      variables: {
        input: {
          bookingId: +booking?.id!,
          status: BookingStatus.Cancel,
        },
      },
      onCompleted(data) {
        const { updateBookingStatus } = data;
        if (updateBookingStatus.error) {
          toast.error(updateBookingStatus.error.message);
          return;
        }
        toast.success("Đã huỷ đơn");
      },
      onError(error) {
        toast.error("Lỗi xảy ra, thử lại sau");
      },
      refetchQueries: ["BookingDetail"],
    });
  const sendFeedBack = () => {
    if (!booking) return;
    feedback({
      variables: {
        input: {
          id: booking.id,
          rating: feedbackState.star,
          feedback: feedbackState.text,
        },
      },
    });
  };

  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && booking && (
        <div className="max-w-screen-xl mx-auto px-2 py-3 sm:p-6 bg-white rounded-md shadow-md my-12">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Chi tiết đơn thuê
            </h3>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <InforRow title={"Họ tên"} value={booking.customerName} />
              <InforRow title={"Số điện thoại"} value={booking.customerPhone} />
              <InforRow title={"Mã đơn thuê"} value={booking.bookingCode} />
              <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  {"Trạng thái"}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-col">
                  <h1>{BookingStatusBackEnd[booking.status]}</h1>
                  {(booking.status === BookingStatus.Deposited ||
                    booking.status === BookingStatus.NotDeposite) && (
                    <div className="flex flex-end w-full mt-4">
                      <LoadingButton
                        className="w-fit"
                        loading={updateStatusLoading}
                        text="Huỷ đơn"
                        onClick={() => updateBooking()}
                      />
                    </div>
                  )}
                </dd>
              </div>
              <InforRow
                title={"Địa chỉ nhận xe"}
                value={booking.homeDelivery}
              />
              <InforRow
                title="Thời gian"
                value={`${new Date(booking.startDate).toLocaleDateString("vi", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })} đến ${new Date(booking.endDate).toLocaleDateString("vi", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              />
              {booking.services && booking.services.length > 0 && (
                <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Dịch vụ kèm theo
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {booking.services.map((e, i) => (
                      <div key={i} className="">
                        <div>
                          {e.serviceName} ({e.servicePrice}đ{" "}
                          {e.perDay ? "theo ngày" : "theo xe"})
                        </div>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
              <InforRow title={"Số lượng"} value={booking.quantity} />
              <InforRow
                title={"Thanh toán"}
                value={PaymentBackEnd[booking.payment]}
              />
              <InforRow
                title={"Loại xe"}
                value={CarTypeEnumBackEnd[booking.carType.carType]}
              />
              <InforRow title={"Tổng tiền"} value={`${booking.totalPrice}đ`} />
              {booking.status === BookingStatus.Finished &&
                (booking.rating === null || booking.rating === undefined) && (
                  <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Đánh giá
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-col space-y-4">
                      <div className="flex flex-col space-y-2">
                        <h1>Đánh giá</h1>
                        <div className="flex">
                          {range(5).map((e) => {
                            if (e < feedbackState.star) {
                              return (
                                <StarIcon
                                  onClick={() =>
                                    setFeedbackState((pre) => ({
                                      ...pre,
                                      star: e + 1,
                                    }))
                                  }
                                  key={e}
                                  className="w-8 h-8 text-yellow-300 cursor-pointer hover:text-yellow-400"
                                />
                              );
                            }
                            return (
                              <StarIcon
                                onClick={() =>
                                  setFeedbackState((pre) => ({
                                    ...pre,
                                    star: e + 1,
                                  }))
                                }
                                key={e}
                                className="w-8 h-8 text-gray-300 cursor-pointer hover:text-gray-400"
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="feedback"
                          className="block text-sm font-medium text-gray-700 text-start"
                        >
                          Phản hồi dịch vụ
                        </label>
                        <div className="mt-1">
                          <textarea
                            value={feedbackState?.text}
                            onChange={(e) =>
                              setFeedbackState((pre) => ({
                                ...pre,
                                text: e.target.value,
                              }))
                            }
                            id="feedback"
                            className="appearance-none block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <LoadingButton
                        onClick={sendFeedBack}
                        loading={feedbackLoading}
                        text="Gửi"
                        className="w-full md:w-1/2"
                      />
                    </dd>
                  </div>
                )}
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};
