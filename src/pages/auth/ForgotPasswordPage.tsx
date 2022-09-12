import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormInput } from "../../components/form/FormInput";
import LoadingButton from "../../components/form/LoadingButton";
import { useForgotPasswordLazyQuery } from "../../graphql/generated/schema";
import { logo } from "../../images";
type ForgotPasswordInputForm = {
  email: string;
};
const inputSchema = yup.object().shape({
  email: yup.string().required("Cần điền email").email("Sai định dạng email"),
});
export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordInputForm>({
    resolver: yupResolver(inputSchema),
  });
  const [forgotPassword, { loading }] = useForgotPasswordLazyQuery({
    onCompleted({ forgotPassword }) {
      const { ok, error } = forgotPassword;
      if (error) {
        toast.error(error.message);
        return;
      }
      if (ok) toast.success("Đã gửi email");
    },
    onError(err) {
      toast.error("Lỗi server, thử lại sau");
    },
  });
  const submitHandler = async () => {
    await forgotPassword({
      variables: {
        input: {
          email: getValues().email,
        },
      },
    });
  };
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src={logo} alt="carIT" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Quên mật khẩu
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
            <FormInput
              id="email"
              labelText="Email"
              errorMessage={errors.email?.message}
              registerReturn={register("email")}
              type="text"
            />
            <LoadingButton loading={loading} text="Gửi email" />
          </form>
        </div>
      </div>
    </div>
  );
}
