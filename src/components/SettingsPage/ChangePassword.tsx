import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useChangePasswordMutation } from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
import { FormInput } from "../form/FormInput";
import LoadingButton from "../form/LoadingButton";
type Props = {};
interface ChangePasswordInputForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const changePasswordInputSchema = yup.object().shape({
  currentPassword: yup.string().required("Không được để trống"),
  newPassword: yup.string().required("Không được để trống"),
  confirmPassword: yup.string().required("Không được để trống"),
});
const ChangePassword: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm<ChangePasswordInputForm>({
    resolver: yupResolver(changePasswordInputSchema),
    mode: "onBlur",
  });
  const [changePassword, { loading }] = useChangePasswordMutation({
    onCompleted(data) {
      const { changePassword } = data;
      if (changePassword.error) {
        toast.error(changePassword.error.message);
        return;
      }
      toast.success("Đổi mật khẩu thành công");
      reset();
    },
    onError(err) {
      const message = getApolloErrorMessage(err);
      if (message) {
        toast.error(message);
        return;
      }
      toast.error("Lỗi server, thử lại sau");
    },
  });
  const submitHandler = async () => {
    const { confirmPassword, currentPassword, newPassword } = getValues();
    if (newPassword !== confirmPassword) {
      setError("confirmPassword", { message: "Mật khẩu xác nhận không khớp" });
      return;
    }
    await changePassword({
      variables: {
        input: {
          confirmPassword,
          currentPassword,
          password: newPassword,
        },
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="divide-y divide-gray-200 lg:col-span-9"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Đổi mật khẩu
        </h2>
        <div className="mt-6 w-1/2 flex flex-col space-y-2">
          <FormInput
            labelText="Mật khẩu hiện tại"
            registerReturn={register("currentPassword")}
            id="password"
            errorMessage={errors.currentPassword?.message}
            type="password"
          />
          <FormInput
            labelText="Mật khẩu mới"
            registerReturn={register("newPassword")}
            id="newPassword"
            errorMessage={errors.newPassword?.message}
            type="password"
          />
          <FormInput
            labelText="Xác nhận mật khẩu"
            registerReturn={register("confirmPassword")}
            id="confirmPassword"
            errorMessage={errors.confirmPassword?.message}
            type="password"
          />
        </div>
      </div>
      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <div className="w-full sm:w-fit">
          <LoadingButton loading={loading} text="Đổi mật khẩu" />
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
