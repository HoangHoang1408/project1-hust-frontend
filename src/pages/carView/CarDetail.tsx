import { ReceiptRefundIcon } from "@heroicons/react/outline";
import {
  CalendarIcon,
  CogIcon,
  FireIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/solid";
import { range } from "lodash";
import { FC, Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CarTypeEnumBackEnd,
  EngineTypeBackEnd,
  TransmissionTypeBackEnd,
} from "../../common/enumConstants";
import Loading from "../../components/Loading";
import {
  useCarDetailQuery,
  useGetCarsByLazyQuery,
} from "../../graphql/generated/schema";
import { loadingWhite } from "../../images";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";

type Props = {};
const CarDetail: FC<Props> = () => {
  const params = useParams();
  const { data, loading } = useCarDetailQuery({
    variables: {
      input: {
        carId: params.id!,
      },
    },
    onCompleted(data) {
      const { getCarDetail } = data;
      if (getCarDetail.error) {
        toast.error(getCarDetail.error.message);
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
  const car = data?.getCarDetail.car;
  const [
    getRelatedCars,
    { data: relatedCarsData, loading: relatedCarLoadings },
  ] = useGetCarsByLazyQuery({
    onCompleted(data) {
      const { getCarsBy } = data;
      if (getCarsBy.error) {
        toast.error(getCarsBy.error.message);
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
  useEffect(() => {
    if (!car) return;
    getRelatedCars({
      variables: {
        input: {
          pagination: {
            page: 1,
            resultsPerPage: 5,
          },
          carType: car.carType.carType,
        },
      },
    });
  }, [car]);
  const relatedCars = relatedCarsData?.getCarsBy.cars
    ?.filter((c) => c.id !== car?.id)
    .slice(0, 5);
  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && car && (
        <div className="bg-white">
          <main className="mx-auto pt-14 pb-24 px-4 sm:pt-16 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Product */}
            <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              {/* Product image */}
              <div className="lg:row-end-1 lg:col-span-4">
                <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                  {car.images && (
                    <img
                      src={car.images[0].fileUrl}
                      className="object-center object-cover w-full h-[30rem]"
                    />
                  )}
                </div>
              </div>
              {/* Product details */}
              <div className="max-w-2xl w-full mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                <div className="flex flex-col text-gray-800">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-2xl font-semibold">{car.name}</h1>
                    <div className="flex space-x-1">
                      {range(5).map((e) => {
                        if (car.rating >= e + 1)
                          return (
                            <StarIcon
                              key={e}
                              className="w-5 h-5 text-yellow-300"
                            />
                          );
                        return (
                          <StarIcon key={e} className="w-5 h-5 text-gray-300" />
                        );
                      })}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-8">
                    <h3 className="font-medium text-gray-900">
                      Thông tin cơ bản
                    </h3>
                    <div className="mt-2 flex flex-col space-y-1 pl-2 prose prose-sm text-gray-500">
                      <div className="flex space-x-2">
                        <h1 className="text-gray-900">Dòng xe:</h1>
                        <h1>{CarTypeEnumBackEnd[car.carType.carType]}</h1>
                      </div>
                      <div className="flex space-x-2">
                        <h1 className="text-gray-900">Biển số xe:</h1>
                        <h1>{car.licensePlate}</h1>
                      </div>
                      <div className="flex space-x-2">
                        <h1 className="text-gray-900">Hãng xe:</h1>
                        <h1>{car.carBrand}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-8">
                    <h3 className="font-medium text-gray-900">
                      Thông số cơ bản
                    </h3>
                    <div className="mt-2 grid grid-cols-12 gap-y-2 gap-x-2 pl-2 prose prose-sm text-gray-500">
                      <div className="flex space-x-2 col-span-6">
                        <FireIcon className="h-6 w-6" />
                        <h1>Mức tiêu thụ: {car.consumption}L</h1>
                      </div>
                      <div className="flex space-x-2 col-span-6">
                        <ReceiptRefundIcon className="h-6 w-6" />
                        <h1>
                          Hộp số:{" "}
                          {TransmissionTypeBackEnd[car.transmissionType]}
                        </h1>
                      </div>
                      <div className="flex space-x-2 col-span-6">
                        <CogIcon className="h-6 w-6" />
                        <h1>Động cơ: {EngineTypeBackEnd[car.engineType]}</h1>
                      </div>
                      <div className="flex space-x-2 col-span-6">
                        <CalendarIcon className="h-6 w-6" />
                        <h1>Sản xuất: {car.manufactureYear}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-8">
                    <h3 className="font-medium text-gray-900">Tính năng</h3>
                    <div className="mt-2 pl-2 grid grid-cols-12 gap-x-2 gap-y-1 prose prose-sm text-gray-500">
                      {car.features.map((f) => (
                        <li className="col-span-6" key={f}>
                          {f}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4"></div>
            </div>

            <div className="max-w-2xl mx-auto mt-24 sm:mt-32 lg:max-w-none">
              <div className="flex items-center justify-between space-x-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Xem xe khác
                </h2>
                <Link
                  to={"/"}
                  className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Tất cả<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
              {relatedCarLoadings && (
                <div className="flex justify-center">
                  <img className="" src={loadingWhite}></img>
                </div>
              )}
              {relatedCars && (
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                  {relatedCars.map((car) => {
                    console.log(car.images![0]);
                    return (
                      <div key={car.id} className="relative group">
                        <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                          {car.images && (
                            <img
                              src={car.images[0].fileUrl}
                              className="object-center object-cover w-full h-44"
                            />
                          )}
                          {!car.images && (
                            <div className="flex justify-center">
                              <TruckIcon className="text-indigo-400 h-40 w-auto" />
                            </div>
                          )}
                          <div
                            className="flex items-end opacity-0 p-4 group-hover:opacity-100"
                            aria-hidden="true"
                          >
                            <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center">
                              Xem xe
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                          <h3>
                            <Link to={`/cars/${car.id}`}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {car.name}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </Fragment>
  );
};
export default CarDetail;
