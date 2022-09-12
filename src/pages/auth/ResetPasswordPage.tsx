import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormInput } from "../../components/form/FormInput";
import LoadingButton from "../../components/form/LoadingButton";
import { useResetPasswordMutation } from "../../graphql/generated/schema";
import { logo } from "../../images";
type ResetPasswordInputForm = {
  password: string;
  confirmPassword: string;
};
const inputSchema = yup.object().shape({
  password: yup.string().required("Cần điền mật khẩu"),
  confirmPassword: yup.string().required("Cần điền xác nhận mật khẩu"),
});
export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInputForm>({
    resolver: yupResolver(inputSchema),
  });
  const [resetPassword, { loading }] = useResetPasswordMutation({
    onCompleted({ verifyForgotPassword }) {
      const { ok, error } = verifyForgotPassword;
      if (error) {
        toast.error(error.message);
        return;
      }
      if (ok) {
        toast.success("Đổi mật khẩu thành công", { autoClose: 2000 });
        navigate("/auth/login");
      }
    },
    onError(err) {
      toast.error("Lỗi server, thử lại sau");
    },
  });
  const submitHandler = async () => {
    const { confirmPassword, password } = getValues();
    if (confirmPassword !== password) {
      setError("confirmPassword", {
        message: "Mật khẩu xác nhận không đúng",
      });
    }
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Link lấy lại mật khẩu không hợp lệ");
      return;
    }
    await resetPassword({
      variables: {
        input: {
          confirmPassword,
          password,
          verificationToken: token,
        },
      },
    });
  };
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src={logo} alt="carIT" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đổi mật khẩu
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-4"
            action="#"
            method="POST"
          >
            <FormInput
              id="password"
              labelText="Mật khẩu"
              errorMessage={errors.password?.message}
              registerReturn={register("password")}
              type="password"
            />
            <FormInput
              id="confirmPassword"
              labelText="Xác nhận mật khẩu"
              errorMessage={errors.confirmPassword?.message}
              type="password"
              registerReturn={register("confirmPassword")}
            />
            <LoadingButton loading={loading} text="Đổi mật khẩu" />
          </form>
        </div>
      </div>
    </div>
  );
}
