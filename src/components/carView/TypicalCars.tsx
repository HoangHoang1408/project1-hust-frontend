import { TruckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { CarTypeEnumBackEnd } from "../../common/enumConstants";
import { CarFragmentFragment } from "../../graphql/generated/schema";

type Props = {
  cars: CarFragmentFragment[];
};

const TypicalCars = ({ cars }: Props) => {
  return (
    <div aria-labelledby="timeline-title" className="lg:col-span-5">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 text-gray-700">
        <h2
          id="timeline-title"
          className="text-lg font-medium text-gray-900 mb-4"
        >
          Các mẫu xe tiêu biểu
        </h2>
        <div className="flex flex-col divide-y space-y-3">
          {cars &&
            cars.map((car) => (
              <div className="shadow rounded p-2 flex flex-col">
                <div className="grid grid-cols-12 gap-x-2">
                  <div className="col-span-4">
                    {car.images && (
                      <img
                        src={car.images[0].fileUrl}
                        className="object-center object-cover h-32 w-auto"
                      />
                    )}
                    {!car.images && (
                      <div className="flex justify-center">
                        <TruckIcon className="text-indigo-400 h-32 w-auto" />
                      </div>
                    )}
                  </div>
                  <div className="col-span-8 p-2 flex flex-col space-y-2">
                    <div className="grid grid-cols-12 gap-1 text-sm ">
                      <h1 className="col-span-4">Hãng xe:</h1>
                      <h1 className="col-span-8 font-semibold">
                        {car.carBrand}
                      </h1>
                    </div>
                    <div className="grid grid-cols-12 gap-1 text-sm ">
                      <h1 className="col-span-4">Tên xe:</h1>
                      <h1 className="col-span-8 font-semibold">{car.name}</h1>
                    </div>
                    <div className="grid grid-cols-12 gap-1 text-sm ">
                      <h1 className="col-span-4">Đời xe:</h1>
                      <h1 className="col-span-8 font-semibold">
                        {car.manufactureYear}
                      </h1>
                    </div>
                    <div className="grid grid-cols-12 gap-1 text-sm ">
                      <h1 className="col-span-4">Loại xe</h1>
                      <h1 className="col-span-8 font-semibold">
                        {CarTypeEnumBackEnd[car.carType.carType]}
                      </h1>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/cars/${car.id}`}
                  className="self-end text-white py-2 px-3 rounded bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold mr-6"
                >
                  Chi tiết
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TypicalCars;
