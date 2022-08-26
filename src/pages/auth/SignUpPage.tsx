import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { FormInput, FormInputProps } from "../../components/form/FormInput";
import { UserRole, useSignupMutation } from "../../graphql/generated/schema";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpInputForm>({
    resolver: yupResolver(signupInputSchema),
    mode: "onBlur",
  });
  const [signup, { error, data, loading }] = useSignupMutation();
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
    });
    
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
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
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
