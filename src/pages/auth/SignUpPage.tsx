import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormInput, FormInputProps } from "../../components/form/FormInput";
import LoadingButton from "../../components/form/LoadingButton";
import { UserRole, useSignupMutation } from "../../graphql/generated/schema";
import { logo } from "../../images";
interface SignUpInputForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const signupInputSchema = yup.object().shape({
  name: yup.string().required("Cần điền tên"),
  email: yup.string().required("Cần điền email").email("Sai định dạng email"),
  password: yup.string().required("Cần điền mật khẩu"),
  confirmPassword: yup.string().required("Cần điền xác nhận mật khẩu"),
});

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpInputForm>({
    resolver: yupResolver(signupInputSchema),
    mode: "onBlur",
  });
  const [signup, { loading }] = useSignupMutation();
  const signupFormProps: FormInputProps[] = [
    {
      id: "name",
      labelText: "Tên",
      errorMessage: errors.name?.message,
      registerReturn: register("name"),
      type: "text",
    },
    {
      id: "email",
      labelText: "Email",
      errorMessage: errors.email?.message,
      registerReturn: register("email"),
      type: "text",
    },
    {
      id: "password",
      labelText: "Mật khẩu",
      errorMessage: errors.password?.message,
      registerReturn: register("password"),
      type: "password",
    },
    {
      id: "confirmPassword",
      labelText: "Mật khẩu xác nhận",
      errorMessage: errors.confirmPassword?.message,
      registerReturn: register("confirmPassword"),
      type: "password",
    },
  ];

  const submitHandler: SubmitHandler<SignUpInputForm> = async (data) => {
    if (data.confirmPassword !== data.password) {
      setError("confirmPassword", { message: "Mật khẩu xác nhận không đúng" });
      return;
    }
    await signup({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: UserRole.Normal,
        },
      },
      onCompleted({ signup }) {
        const { ok, error } = signup;
        if (error) {
          toast.error(error.message);
          return;
        }
        if (ok) {
          toast.success("Tạo tài khoản thành công");
          navigate("/auth/login");
        }
      },
      onError(err) {
        toast.error("Lỗi server, thử lại sau");
      },
    });
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src={logo} alt="carIT" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tạo tài khoản mới
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-2">
            {signupFormProps.map((p, i) => (
              <FormInput key={i} {...p} />
            ))}
            <div className="flex justify-end text-sm space-x-1">
              <p>Đã có tài khoản?</p>
              <Link
                to={"/auth/login"}
                className="text-indigo-600 cursor-pointer"
              >
                Đăng nhập
              </Link>
            </div>
            <LoadingButton loading={loading} text={"Đăng kí"} />
          </form>
        </div>
      </div>
    </div>
  );
}
