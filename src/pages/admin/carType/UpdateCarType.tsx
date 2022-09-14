import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { CarTypeEnumBackEnd, PaymentBackEnd } from "../../../common/enumConstants";
import FormInput from "../../../components/adminPage/createCar/FormInput";
import InputAddable from "../../../components/adminPage/createCar/InputAddable";
import SelectInputAddable from "../../../components/adminPage/createCar/SelectInputAddable";
import LoadingButton from "../../../components/form/LoadingButton";
import Loading from "../../../components/Loading";
import {
  CarTypeEnum,
  Payment,
  Procedure,
  useGetCarTypeQuery,
  useUpdateCarTypeMutation,
} from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";

type UpdateCarTypeInputForm = {
  price: number;
  maxDistance?: number;
  additionalDistancePrice?: number;
  procedures: Procedure;
  acceptedPayment: Payment[];
};
const UpdateCarInputSchema = yup.object().shape({
  price: yup
    .number()
    .typeError("Giá trị không hợp lệ")
    .required("Cần điền giá tiền"),
  maxDistance: yup.number().typeError("Giá trị không hợp lệ"),
  additionalDistancePrice: yup.number().typeError("Giá trị không hợp lệ"),
  acceptedPayment: yup
    .array(yup.string().required())
    .required()
    .min(1, "Cần có ít nhất một loại thanh toán"),
});
type Props = {};
const UpdateCarType: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: carTypeData, loading: getCarTypeLoading } = useGetCarTypeQuery({
    variables: {
      input: {
        carType: params.cartype as CarTypeEnum,
      },
    },
    onCompleted(data) {
      const { getCarType } = data;
      if (getCarType.error) {
        toast.error(getCarType.error.message);
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
  const carType = carTypeData?.getCarType.carType;
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    reset,
    handleSubmit,
  } = useForm<UpdateCarTypeInputForm>({
    mode: "onBlur",
    resolver: yupResolver(UpdateCarInputSchema),
  });
  useEffect(() => {
    if (!carTypeData?.getCarType) return;
    if (!carType) return;
    const {
      acceptedPayment,
      price,
      procedures,
      additionalDistancePrice,
      maxDistance,
    } = carType;
    reset({
      acceptedPayment,
      additionalDistancePrice: additionalDistancePrice || undefined,
      maxDistance: maxDistance || undefined,
      price,
      procedures,
    });
  }, [carTypeData]);
  const [updateCarType, { loading }] = useUpdateCarTypeMutation({
    onCompleted(data) {
      const { updateCarType } = data;
      if (updateCarType.error) {
        toast.error(updateCarType.error.message);
        return;
      }
      toast.success("Đã được cập nhật");
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
  const submitHandler = async () => {
    const {
      acceptedPayment,
      price,
      additionalDistancePrice,
      maxDistance,
      procedures: { mortgatePaper, verificationPaper, mortgateProperty },
    } = getValues();
    if (!carType) {
      toast.error("Lôi xảy ra, thử lại sau");
      return;
    }
    await updateCarType({
      variables: {
        input: {
          acceptedPayment,
          price,
          additionalDistancePrice,
          maxDistance,
          carType: carType?.carType,
          procedures: {
            mortgatePaper,
            verificationPaper,
            mortgateProperty,
          },
        },
      },
    });
  };
  return (
    <Fragment>
      {getCarTypeLoading && <Loading />}
      {!getCarTypeLoading && carType && (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-8 pl-12 pr-16 pt-12 pb-16 "
        >
          <div className="space-y-8 sm:space-y-5">
            <div className="flex flex-col">
              <h3 className="leading-6 font-semibold text-gray-900 text-2xl mb-8">
                Cập nhật loại xe
              </h3>
              <div className="pb-8 border-b-2 border-gray-200">
                <h1 className="text-indigo-700 font-semibold">
                  Thông tin cơ bản
                </h1>
                <div className="pl-4">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <h1 className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Tên loại xe
                    </h1>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-lg flex flex-col rounded-md">
                      <h1 className="flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2">
                        {CarTypeEnumBackEnd[carType.carType]}
                      </h1>
                    </div>
                  </div>
                  <FormInput
                    id="price"
                    registerReturn={register("price")}
                    labelText="Giá thành"
                    errorMessage={errors.price?.message}
                    type={"number"}
                  />
                  <FormInput
                    id="maxDistance"
                    registerReturn={register("maxDistance")}
                    labelText="Giới hạn quãng đường"
                    errorMessage={errors.maxDistance?.message}
                    type={"number"}
                  />
                  <FormInput
                    id="additionalDistancePrice"
                    registerReturn={register("additionalDistancePrice")}
                    labelText="Phí phụ trội"
                    errorMessage={errors.additionalDistancePrice?.message}
                    type={"number"}
                  />
                </div>
              </div>
            </div>
            <div className="border-b-2 border-gray-200 pb-8">
              <h1 className="font-semibold text-indigo-700 pb-8">Giấy tờ</h1>
              <InputAddable
                labelText="Giấy tờ xác minh"
                labelValue="Giấy tờ"
                setValues={(v: string[]) =>
                  setValue("procedures.verificationPaper", v, {
                    shouldValidate: true,
                  })
                }
                defaultValues={
                  carType.procedures.verificationPaper || undefined
                }
                errorMessage={errors.procedures?.verificationPaper?.message}
              />
              <InputAddable
                labelText="Giấy tờ thế chấp"
                labelValue="Giấy tờ"
                setValues={(v: string[]) =>
                  setValue("procedures.mortgatePaper", v, {
                    shouldValidate: true,
                  })
                }
                defaultValues={carType.procedures.mortgatePaper || undefined}
                errorMessage={errors.procedures?.mortgatePaper?.message}
              />
              <InputAddable
                labelText="Tài sản thế chấp"
                labelValue="Tài sản"
                setValues={(v: string[]) =>
                  setValue("procedures.mortgateProperty", v, {
                    shouldValidate: true,
                  })
                }
                defaultValues={carType.procedures.mortgateProperty || undefined}
                errorMessage={errors.procedures?.mortgateProperty?.message}
              />
            </div>
            <SelectInputAddable
              labelText="Thanh toán"
              setValues={(v: string[]) =>
                setValue("acceptedPayment", v as Payment[], {
                  shouldValidate: true,
                })
              }
              valueDisplay={Object.values(Payment).map(
                (p) => PaymentBackEnd[p]
              )}
              valueLable="Loại"
              valueRange={Object.values(Payment)}
              errorMessage={errors.acceptedPayment?.message}
              defaultValues={carType.acceptedPayment}
            />
          </div>
          <div className="pt-5">
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => navigate("/admin/cartypes")}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Huỷ
              </button>
              <LoadingButton
                loading={loading}
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
export default UpdateCarType;
