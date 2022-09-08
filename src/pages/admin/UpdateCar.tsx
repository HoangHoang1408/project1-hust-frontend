import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FC, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  CarBrandBackEnd,
  CarTypeEnumBackEnd,
  EngineTypeBackEnd,
  TransmissionTypeBackEnd,
} from "../../common/enumConstants";
import Features from "../../components/adminPage/createCar/Feature";
import FormInput from "../../components/adminPage/createCar/FormInput";
import SelectInput from "../../components/adminPage/createCar/SelectInput";
import LoadingButton from "../../components/form/LoadingButton";
import Loading from "../../components/Loading";
import { SERVER_URL } from "../../config";
import {
  CarBrand,
  CarTypeEnum,
  EngineType,
  StoredFileInputType,
  TransmissionType,
  useCarDetailQuery,
  useUpdateCarMutation,
} from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";

type UpdateCarInputForm = {
  name: string; //
  engineType: EngineType;
  manufactureYear: number;
  licensePlate: string; //
  carBrand: CarBrand;
  transmissionType: TransmissionType;
  consumption: number;
  features: string[];
  carType: CarTypeEnum; //
};
const UpdateCarInputSchema = yup.object().shape({
  name: yup.string().required("Cần điền thông tin"),
  engineType: yup.string().required("Cần điền thông tin"),
  manufactureYear: yup
    .number()
    .typeError("Cần điền số")
    .required("Cần điền thông tin"),
  licensePlate: yup.string().required("Cần điền thông tin"),
  carBrand: yup.string().required("Cần điền thông tin"),
  transmissionType: yup.string().required("Cần điền thông tin"),
  consumption: yup
    .number()
    .typeError("Cần điền số")
    .required("Cần điền thông tin"),
  features: yup
    .array(yup.string().required())
    .required("Cần điền thông tin")
    .min(1, "Cần có ít nhất 1 mục"),
  carType: yup.string().required("Cần điền thông tin"),
});
type Props = {};
const UpdateCar: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [images, setImages] = useState<File[]>();
  const { data: carData, loading: getCarLoading } = useCarDetailQuery({
    variables: {
      input: {
        carId: params.id!,
      },
    },
    onCompleted(data) {
      const { getCarDetail } = data;
      if (getCarDetail.error) {
        toast.error(getCarDetail.error.message);
        navigate("/admin");
        return;
      }
    },
    onError(err) {
      const msg = getApolloErrorMessage(err);
      if (msg) {
        toast.error(msg);
        navigate("/admin");
        return;
      }
      toast.error("Lỗi xảy ra, thử lại sau");
    },
  });
  const car = carData?.getCarDetail.car;
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    reset,
    handleSubmit,
  } = useForm<UpdateCarInputForm>({
    mode: "onBlur",
    resolver: yupResolver(UpdateCarInputSchema),
  });
  useEffect(() => {
    if (!carData?.getCarDetail) return;
    if (!car) return;
    const {
      carBrand,
      carType: { carType },
      consumption,
      engineType,
      features,
      licensePlate,
      manufactureYear,
      name,
      transmissionType,
    } = car;
    reset({
      carBrand,
      carType,
      consumption,
      engineType,
      features,
      licensePlate,
      manufactureYear,
      name,
      transmissionType,
    });
  }, [carData]);
  const [updateCar, { loading }] = useUpdateCarMutation({
    onCompleted(data) {
      const { updateCar } = data;
      if (updateCar.error) {
        toast.error(updateCar.error.message);
        return;
      }
      toast.success("Xe đã được cập nhật");
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
  const [loadingMain, setLoadingMain] = useState(false);
  useEffect(() => {
    if (loading) setLoadingMain(true);
  }, [loading]);
  const submitHandler = async () => {
    const {
      carBrand,
      carType,
      consumption,
      engineType,
      features,
      licensePlate,
      manufactureYear,
      name,
      transmissionType,
    } = getValues();
    let sendImages: StoredFileInputType[] | undefined = undefined;
    try {
      const formData = new FormData();
      setLoadingMain(true);
      if (images) {
        if (car?.images) {
          await axios.post(
            SERVER_URL + "/delete/files",
            {
              storagePaths: car.images.map((i) => i.filePath),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        images.forEach((f) => formData.append("files", f));
        formData.append("storagePath", "cars");
        const res = await axios.post(SERVER_URL + "/upload/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        sendImages = res.data["fileReferences"];
      }
      await updateCar({
        variables: {
          input: {
            carId: car?.id!,
            carBrand,
            consumption: +consumption,
            engineType,
            features,
            licensePlate,
            manufactureYear: +manufactureYear,
            name,
            transmissionType,
            carType,
            images: sendImages,
          },
        },
      });
    } catch (err) {
      if (sendImages)
        await axios.delete(SERVER_URL + "/files", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            storagePaths: sendImages.map((i) => i.filePath),
          },
        });
      toast.error("Lỗi xảy ra, thử lại sau");
    } finally {
      setLoadingMain(false);
    }
  };
  return (
    <Fragment>
      {getCarLoading && <Loading />}
      {!getCarLoading && car && (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-8 pl-12 pr-16 pt-12 pb-16 "
        >
          <div className="space-y-8 sm:space-y-5">
            <div className="flex flex-col">
              <h3 className="leading-6 font-semibold text-gray-900 text-2xl mb-8">
                Thêm xe mới
              </h3>
              <div className="border-b-2 border-gray-200 pb-8">
                <h1 className="text-indigo-700 font-semibold">
                  Thông tin cơ bản
                </h1>
                <div className="pl-4">
                  <FormInput
                    id="name"
                    registerReturn={register("name")}
                    labelText="Tên xe"
                    errorMessage={errors.name?.message}
                    type={"text"}
                  />
                  <FormInput
                    id="licensePlate"
                    registerReturn={register("licensePlate")}
                    labelText="Biển số xe"
                    errorMessage={errors.licensePlate?.message}
                    type={"text"}
                  />
                  <SelectInput
                    id="carType"
                    labelText="carType"
                    showedValues={Object.values(CarTypeEnum).map(
                      (e) => CarTypeEnumBackEnd[e]
                    )}
                    values={Object.values(CarTypeEnum)}
                    registerReturn={register("carType")}
                    errorMessage={errors.carType?.message}
                  />
                  <SelectInput
                    id="carBrand"
                    labelText="Hãng xe"
                    showedValues={Object.values(CarBrand).map(
                      (e) => CarBrandBackEnd[e]
                    )}
                    values={Object.values(CarBrand)}
                    registerReturn={register("carBrand")}
                    errorMessage={errors.carBrand?.message}
                  />
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Ảnh
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="text-center flex flex-col space-y-3 items-center">
                          <div className="flex flex-wrap w-full items-center justify-center">
                            {car.images &&
                              !images &&
                              car.images.map((i, b) => {
                                return (
                                  <img
                                    key={b}
                                    className="w-[8rem] h-[8rem] object-center mt-1 ml-1"
                                    src={i.fileUrl}
                                  />
                                );
                              })}
                            {images?.map((i, b) => (
                              <img
                                key={b}
                                className="w-[8rem] h-[8rem] object-center mt-1 ml-1"
                                src={URL.createObjectURL(i)}
                              />
                            ))}
                          </div>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 items-center"
                            >
                              <span>Tải các ảnh lên</span>
                              <input
                                onChange={(e) => {
                                  if (e.target.files)
                                    setImages([...e.target.files]);
                                }}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-gray-200 pb-8">
              <h1 className="font-semibold text-indigo-700">Thông số</h1>
              <div className="pl-4">
                <FormInput
                  id="consumption"
                  registerReturn={register("consumption")}
                  labelText="Mức tiêu thụ"
                  errorMessage={errors.consumption?.message}
                  type={"text"}
                />
                <FormInput
                  id="manufactureYear"
                  registerReturn={register("manufactureYear")}
                  labelText="Năm sản xuất"
                  errorMessage={errors.manufactureYear?.message}
                  type={"number"}
                />
                <SelectInput
                  id="transmissionType"
                  labelText="Loại hộp số"
                  showedValues={Object.values(TransmissionType).map(
                    (e) => TransmissionTypeBackEnd[e]
                  )}
                  values={Object.values(TransmissionType)}
                  registerReturn={register("transmissionType")}
                  errorMessage={errors.transmissionType?.message}
                />
                <SelectInput
                  id="engineType"
                  labelText="Loại động cơ"
                  showedValues={Object.values(EngineType).map(
                    (e) => EngineTypeBackEnd[e]
                  )}
                  values={Object.values(EngineType)}
                  registerReturn={register("engineType")}
                  errorMessage={errors.engineType?.message}
                />
              </div>
            </div>
            <Features
              setValues={(v: string[]) =>
                setValue("features", v, {
                  shouldValidate: true,
                })
              }
              errorMessage={errors.features?.message}
              defaultFeatures={car.features}
            />
          </div>
          <div className="pt-5">
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => navigate("/admin/cars")}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Huỷ
              </button>
              <LoadingButton
                loading={loadingMain}
                text="Cập nhật"
                className="w-fit"
              />
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};
export default UpdateCar;
