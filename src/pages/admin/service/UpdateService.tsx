import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import FormInput from "../../../components/adminPage/createCar/FormInput";
import LoadingButton from "../../../components/form/LoadingButton";
import Loading from "../../../components/Loading";
import {
  useGetServiceQuery,
  useUpdateServiceMutation,
} from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";

type UpdateCarInputForm = {
  serviceName: string;
  description: string;
  servicePrice: number;
  perDay: string;
};
const UpdateCarInputSchema = yup.object().shape({
  serviceName: yup.string().required("Cần điền thông tin"),
  description: yup.string().required("Cần điền thông tin"),
  servicePrice: yup
    .number()
    .typeError("Cần điền số")
    .required("Cần điền thông tin"),
});
type Props = {};
const UpdateService: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: serviceData, loading: getServiceLoading } = useGetServiceQuery({
    variables: {
      input: {
        id: params.id!,
      },
    },
    onCompleted(data) {
      const { getService } = data;
      if (getService.error) {
        toast.error(getService.error.message);
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
  const service = serviceData?.getService.service;
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useForm<UpdateCarInputForm>({
    mode: "onBlur",
    resolver: yupResolver(UpdateCarInputSchema),
  });
  useEffect(() => {
    if (!serviceData?.getService) return;
    if (!service) return;
    const { description, serviceName, servicePrice, perDay } = service;
    reset({
      description,
      serviceName,
      servicePrice,
      perDay: perDay ? "true" : "",
    });
  }, [serviceData]);
  const [updateService, { loading }] = useUpdateServiceMutation({
    onCompleted(data) {
      const { updateService } = data;
      if (updateService.error) {
        toast.error(updateService.error.message);
        return;
      }
      toast.success("Xe đã được cập nhật");
      navigate("/admin/services");
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
    const { description, serviceName, servicePrice, perDay } = getValues();
    await updateService({
      variables: {
        input: {
          id: params.id!,
          description,
          serviceName,
          servicePrice,
          perDay: Boolean(perDay),
        },
      },
      refetchQueries: "active",
    });
  };
  return (
    <Fragment>
      {getServiceLoading && <Loading />}
      {!getServiceLoading && service && (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-8 pl-12 pr-16 pt-12 pb-16 "
        >
          <div className="space-y-8 sm:space-y-5">
            <div className="flex flex-col">
              <h3 className="leading-6 font-semibold text-gray-900 text-2xl mb-8">
                Cập nhật dịch vụ
              </h3>
              <div className="border-b-2 border-gray-200 pb-8">
                <div className="pl-4">
                  <FormInput
                    id="serviceName"
                    registerReturn={register("serviceName")}
                    labelText="Tên dịch vụ"
                    errorMessage={errors.serviceName?.message}
                    type={"text"}
                  />
                  <FormInput
                    id="servicePrice"
                    registerReturn={register("servicePrice")}
                    labelText="Giá thành"
                    errorMessage={errors.servicePrice?.message}
                    type={"number"}
                  />
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor={"description"}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Mô tả
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex flex-col rounded-md">
                        <textarea
                          {...register("description")}
                          id={"description"}
                          className="flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2"
                        />
                        <span className="text-xs text-red-500 mt-1">
                          {errors.description?.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor={"description"}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Tính theo ngày
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex flex-col rounded-md">
                        <select
                          {...register("perDay")}
                          id={"description"}
                          className="appearance-none flex-1 block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-2 border-gray-200 p-2"
                        >
                          <option value={"true"}>Có</option>
                          <option value={""}>Không</option>
                        </select>
                        <span className="text-xs text-red-500 mt-1">
                          {errors.perDay?.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => navigate("/admin/services")}
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
export default UpdateService;
