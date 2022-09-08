import { ReceiptRefundIcon } from "@heroicons/react/outline";
import {
  CalendarIcon,
  CogIcon,
  FireIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { range } from "lodash";
import { FC, Fragment } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CarTypeEnumBackEnd,
  EngineTypeBackEnd,
  TransmissionTypeBackEnd,
} from "../../common/enumConstants";
import Loading from "../../components/Loading";
import { useCarDetailQuery } from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";

const product = {
  name: "Application UI Icon Pack",
  version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
  price: "$220",
  description:
    "The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.",
  highlights: [
    "200+ SVG icons in 3 unique styles",
    "Compatible with Figma, Sketch, and Adobe XD",
    "Drawn on 24 x 24 pixel grid",
  ],
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
  imageAlt:
    "Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};
const relatedProducts = [
  {
    id: 1,
    name: "Fusion",
    category: "UI Kit",
    href: "#",
    price: "$49",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  // More products...
];

type Props = {};
const AdminCarDetail: FC<Props> = () => {
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
                      className="object-center object-cover"
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
          </main>
        </div>
      )}
    </Fragment>
  );
};
export default AdminCarDetail;
