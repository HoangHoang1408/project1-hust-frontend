import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep } from "lodash";
import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  CarTypeEnumBackEnd,
  EngineTypeBackEnd,
  TransmissionTypeBackEnd,
} from "../../common/enumConstants";
import LoadingButton from "../../components/form/LoadingButton";
import {
  CarBrand,
  CarTypeEnum,
  EngineType,
  StoredFileInputType,
  TransmissionType,
  useCreateCarMutation,
} from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
const FormInput: FC<{
  id: string;
  labelText: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  registerReturn?: UseFormRegisterReturn;
}> = ({ id, labelText, errorMessage, registerReturn, type }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {labelText}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex flex-col rounded-md">
          <input
            {...registerReturn}
            type={type}
            id={id}
            className="flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2"
          />
          <span className="text-xs text-red-500 mt-1">{errorMessage}</span>
        </div>
      </div>
    </div>
  );
};
const Features: FC<{
  setValues: (v: string[]) => void;
  errorMessage?: string;
}> = ({ setValues, errorMessage }) => {
  const [features, setFeatures] = useState<string[]>([""]);
  useEffect(() => {
    setValues(features.map((v) => v.trim()).filter((v) => v.length > 0));
  }, [features]);
  return (
    <div className="border-b-2 border-gray-200 pb-8">
      <h1 className="font-semibold text-indigo-700">Tính năng</h1>
      <div className="pl-4">
        {features.map((e, i) => (
          <div
            key={i}
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5"
          >
            <label
              htmlFor={"hello"}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Tính năng {i + 1}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2 flex items-center space-x-3">
              <div className="max-w-lg grow rounded-md shadow-sm">
                <input
                  onChange={(e) =>
                    setFeatures((pre) => {
                      const temp = cloneDeep(pre);
                      temp[i] = e.target.value;
                      return temp;
                    })
                  }
                  value={features[i]}
                  id={"hello"}
                  className="flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2"
                />
              </div>
              <div className="h-7 w-7 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center">
                <XIcon
                  onClick={() => {
                    setFeatures((pre) =>
                      cloneDeep(pre).filter((a, t) => t !== i)
                    );
                  }}
                  className="h-6 w-6  text-indigo-700 "
                />
              </div>
            </div>
          </div>
        ))}
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start mt-1 flex">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"></label>
          <span className="text-xs text-red-500">{errorMessage}</span>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 flex place-items-center">
          <label
            htmlFor={"hello"}
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          ></label>
          <div
            onClick={() => {
              setFeatures((pre) => {
                const temp = cloneDeep(pre);
                temp.push("");
                return temp;
              });
            }}
            className="mt-1 sm:mt-0 sm:col-span-2 w-full"
          >
            <div className="max-w-lg flex bg-gray-100 rounded-md shadow-sm w-full justify-center p-1 cursor-pointer hover:bg-gray-200">
              <PlusIcon className="w-8 h-8 text-indigo-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SelectInput: FC<{
  id: string;
  labelText: string;
  errorMessage?: string;
  registerReturn?: UseFormRegisterReturn;
  values: string[];
  showedValues: string[];
}> = ({
  id,
  labelText,
  errorMessage,
  registerReturn,
  values,
  showedValues,
}) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
      <label htmlFor={id} className="text-gray-700 font-medium sm:text-sm">
        {labelText}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <select
          {...registerReturn}
          id={id}
          className="max-w-lg rounded appearance-none w-full p-2 h-full border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold"
        >
          {values.map((t, i) => (
            <option key={i} value={t}>
              {showedValues[i]}
            </option>
          ))}
        </select>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};
type CreateCarInputForm = {
  name: string; //
  engineType: EngineType;
  manufactureYear: number;
  images: StoredFileInputType; //
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
  manufactureYear: yup.string().required("Cần điền thông tin"),
  licensePlate: yup.string().required("Cần điền thông tin"),
  carBrand: yup.string().required("Cần điền thông tin"),
  transmissionType: yup.string().required("Cần điền thông tin"),
  consumption: yup.string().required("Cần điền thông tin"),
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
    handleSubmit,
    formState: { errors },
    setValue,
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
  const submitHandler = handleSubmit(() => {
    // createCar({
    //   variables: {
    //     input:{
    //     }
    //   },
    // });
  });
  return (
    <form
      onSubmit={submitHandler}
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
                labelText="Loại hộp số"
                showedValues={Object.values(CarTypeEnum).map(
                  (e) => CarTypeEnumBackEnd[e]
                )}
                values={Object.values(TransmissionType)}
                registerReturn={register("carType")}
                errorMessage={errors.carType?.message}
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
                        {images?.map((i) => (
                          <img
                            className="w-32 h-32 object-center mt-2 ml-2"
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
              values={Object.values(TransmissionType)}
              registerReturn={register("engineType")}
              errorMessage={errors.engineType?.message}
            />
          </div>
        </div>
        <Features
          setValues={(v: string[]) => setValue("features", v)}
          errorMessage={errors.features?.message}
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
          <LoadingButton loading={loading} text="Tạo xe" className="w-fit" />
        </div>
      </div>
    </form>
  );
};
export default CreateCar;
