type Props = {};

const FeatureSection = (props: Props) => {
  return (
    <div className="flex flex-col items-center space-x-4 py-9">
      <h1 className="font-bold text-gray-800 text-center text-3xl">
        Hướng dẫn đặt xe
      </h1>
      <div className="mt-24 grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-20 md:gap-y-0 text-white font-semibold">
        <div className="col-span-6 md:col-span-3 bg-indigo-500 w-44 md:w-52 h-32 md:h-36 relative flex flex-col justify-end items-center rounded-md">
          <div className=" bg-indigo-500 w-32 h-32 md:w-40 md:h-40 rounded-full absolute left-1/2 top-0 transform -translate-y-1/2 -translate-x-1/2 grid place-items-center border-2 border-white">
            <p>Bước 1</p>
          </div>
          <h1 className="p-3">Đặt xe</h1>
        </div>
        <div className="col-span-6 md:col-span-3 bg-indigo-500 w-44 md:w-52 h-32 md:h-36 relative flex flex-col justify-end items-center rounded-md">
          <div className=" bg-indigo-500 w-32 h-32 md:w-40 md:h-40 rounded-full absolute left-1/2 top-0 transform -translate-y-1/2 -translate-x-1/2 grid place-items-center border-2 border-white">
            <p>Bước 2</p>
          </div>
          <h1 className="p-3">Nhận xe</h1>
        </div>
        <div className="col-span-6 md:col-span-3 bg-indigo-500 w-44 md:w-52 h-32 md:h-36 relative flex flex-col justify-end items-center rounded-md">
          <div className=" bg-indigo-500 w-32 h-32 md:w-40 md:h-40 rounded-full absolute left-1/2 top-0 transform -translate-y-1/2 -translate-x-1/2 grid place-items-center border-2 border-white">
            <p>Bước 3</p>
          </div>
          <h1 className="p-3">Trải nghiệm xe</h1>
        </div>
        <div className="col-span-6 md:col-span-3 bg-indigo-500 w-44 md:w-52 h-32 md:h-36 relative flex flex-col justify-end items-center rounded-md">
          <div className=" bg-indigo-500 w-32 h-32 md:w-40 md:h-40 rounded-full absolute left-1/2 top-0 transform -translate-y-1/2 -translate-x-1/2 grid place-items-center border-2 border-white">
            <p>Bước 4</p>
          </div>
          <h1 className="p-3">Kết thúc giao dịch</h1>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
