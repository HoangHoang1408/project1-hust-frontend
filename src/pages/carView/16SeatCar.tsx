import { Fragment } from "react";
import { toast } from "react-toastify";
import IntroduceCarType from "../../components/carView/IntroduceCarType";
import TypicalCars from "../../components/carView/TypicalCars";
import Loading from "../../components/Loading";
import { CarTypeEnum, useGetCarsByQuery } from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
export default function Seat16Car() {
  const { data: relatedCarsData, loading: relatedCarLoadings } =
    useGetCarsByQuery({
      variables: {
        input: {
          pagination: {
            page: 1,
            resultsPerPage: 5,
          },
          carType: CarTypeEnum.Seat16,
        },
      },
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

  const cars = relatedCarsData?.getCarsBy.cars;
  return (
    <Fragment>
      {relatedCarLoadings && <Loading />}
      {
        <div className="min-h-full">
          <main className="py-10">
            <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-12">
              <IntroduceCarType
                imageSources={cars?.map((car) =>
                  car.images ? car.images[0].fileUrl || undefined : undefined
                )}
              />
              {cars && <TypicalCars cars={cars} />}
            </div>
          </main>
        </div>
      }
    </Fragment>
  );
}
