import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  CarBrandBackEnd,
  CarTypeEnumBackEnd,
  EngineTypeBackEnd,
  TransmissionTypeBackEnd,
} from "../../../common/enumConstants";
import FormInput from "../../../components/adminPage/createCar/FormInput";
import InputAddable from "../../../components/adminPage/createCar/InputAddable";
import SelectInput from "../../../components/adminPage/createCar/SelectInput";
import LoadingButton from "../../../components/form/LoadingButton";
import { SERVER_URL } from "../../../config";
import {
  CarBrand,
  CarTypeEnum,
  EngineType,
  StoredFileInputType,
  TransmissionType,
  useCreateCarMutation,
} from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";

type CreateCarInputForm = {
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
const CreateCarInputSchema = yup.object().shape({
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
const CreateCar: FC<Props> = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    reset,
    handleSubmit,
  } = useForm<CreateCarInputForm>({
    mode: "onBlur",
    resolver: yupResolver(CreateCarInputSchema),
  });
  const [createCar, { loading }] = useCreateCarMutation({
    onCompleted(data) {
      const { createCar } = data;
      if (createCar.error) {
        toast.error(createCar.error.message);
        return;
      }
      reset();
      setImages(undefined);
      toast.success("Xe đã được thêm");
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
    if (!images) {
      toast.error("Cần thêm ảnh cho xe");
      return;
    }
    let sendImages: StoredFileInputType[] | null = null;
    try {
      const formData = new FormData();
      images.forEach((f) => formData.append("files", f));
      formData.append("storagePath", "cars");
      setLoadingMain(true);
      const res = await axios.post(SERVER_URL + "/upload/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      sendImages = res.data["fileReferences"];
      await createCar({
        variables: {
          input: {
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
    } finally {
      setLoadingMain(false);
    }
  };
  return (
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
            <h1 className="text-indigo-700 font-semibold">Thông tin cơ bản</h1>
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
                labelText="Loại xe"
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
        <InputAddable
          setValues={(v: string[]) =>
            setValue("features", v, {
              shouldValidate: true,
            })
          }
          errorMessage={errors.features?.message}
          labelText="Tính năng"
          labelValue="Tính năng"
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
            text="Tạo xe"
            className="w-fit"
          />
        </div>
      </div>
    </form>
  );
};
export default CreateCar;
