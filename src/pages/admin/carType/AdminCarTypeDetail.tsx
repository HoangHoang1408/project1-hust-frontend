import { FC, Fragment } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CarTypeEnumBackEnd, PaymentBackEnd } from "../../../common/enumConstants";
import Loading from "../../../components/Loading";
import {
  CarTypeEnum,
  useGetCarTypeQuery,
} from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";

type Props = {};
const AdminCarTypeDetail: FC<Props> = () => {
  const params = useParams();
  const { data, loading } = useGetCarTypeQuery({
    variables: {
      input: {
        carType: params.cartype as CarTypeEnum,
      },
    },
    onCompleted(data) {
      const { getCarType } = data;
      if (getCarType.error) {
        toast.error(getCarType.error.message);
        return;
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
  const carType = data?.getCarType.carType;
  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && carType && (
        <div className="m-8 p-6 rounded shadow">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Thông tin loại xe
            </h3>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Tên loại xe
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {CarTypeEnumBackEnd[carType.carType]}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Giá thành</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {carType.price}đ
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Quãng đường tối đa
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {carType.maxDistance} km
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Phí phụ trội
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {carType.additionalDistancePrice}đ / km
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Số lượng xe có
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.getCarType.numOfCars} xe
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Thanh toán chấp nhận
                </dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {carType.acceptedPayment.map((p) => (
                    <li>{PaymentBackEnd[p]}</li>
                  ))}
                </div>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Thủ tục yêu cầu
                </dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-col space-y-3">
                  {carType.procedures.verificationPaper &&
                    carType.procedures.verificationPaper.length > 0 && (
                      <div>
                        <h1 className="font-semibold">Giấy tờ xác minh:</h1>
                        <div>
                          {carType.procedures.verificationPaper?.map((e) => (
                            <li>{e}</li>
                          ))}
                        </div>
                      </div>
                    )}
                  {carType.procedures.mortgatePaper &&
                    carType.procedures.mortgatePaper.length > 0 && (
                      <div>
                        <h1 className="font-semibold">Giấy tờ thế chấp:</h1>
                        <div>
                          {carType.procedures.mortgatePaper?.map((e) => (
                            <li>{e}</li>
                          ))}
                        </div>
                      </div>
                    )}
                  {carType.procedures.mortgateProperty &&
                    carType.procedures.mortgateProperty.length > 0 && (
                      <div>
                        <h1 className="font-semibold">Tài sản thế chấp:</h1>
                        <div>
                          {carType.procedures.mortgateProperty?.map((e) => (
                            <li>{e}</li>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default AdminCarTypeDetail;
