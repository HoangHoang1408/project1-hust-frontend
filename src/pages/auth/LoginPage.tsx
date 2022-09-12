import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  LoginStatus,
  loginStatusVar,
  setLoginStatusToLocal,
} from "../../apollo/reactiveVar/loginStatus";
import { FormInput, FormInputProps } from "../../components/form/FormInput";
import LoadingButton from "../../components/form/LoadingButton";
import {
  LoginDocument,
  LoginQuery,
  LoginQueryVariables,
} from "../../graphql/generated/schema";
import { logo } from "../../images";
type LoginInputForm = {
  email: string;
  password: string;
  remember: boolean;
};
const loginInputSchema = yup.object().shape({
  email: yup.string().required("Cần điền email").email("Sai định dạng email"),
  password: yup.string().required("Cần điền mật khẩu"),
});
export default function LoginPage() {
  const navigate = useNavigate();
  const loginStatus = useReactiveVar(loginStatusVar);
  useEffect(() => {
    if (loginStatus?.isLoggedIn) navigate("/");
  }, [loginStatus]);
  const [login, { loading }] = useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginInputForm>({
    resolver: yupResolver(loginInputSchema),
    mode: "onBlur",
  });
  const submitHandler: SubmitHandler<LoginInputForm> = async (data) => {
    await login({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
      onCompleted({ login }) {
        const { error, accessToken } = login;
        if (error) {
          toast.error(error.message);
          return;
        }
        if (!accessToken) {
          toast.error("Lỗi khi đăng nhập, thử lại sau");
          return;
        }
        const status: LoginStatus = {
          accessToken: accessToken,
          isLoggedIn: true,
        };
        loginStatusVar(status);
        if (getValues("remember")) setLoginStatusToLocal(status);
      },
      onError(error) {
        toast.error("Lỗi server, thử lại sau");
      },
    });
  };
  const signupFormProps: FormInputProps[] = [
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
  ];
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src={logo} alt="carIT" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập vào tài khoản
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
            {signupFormProps.map((p, i) => (
              <FormInput key={i} {...p} />
            ))}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register("remember")}
                  id="remember-me"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Ghi nhớ
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/auth/forgotpassword"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu
                </Link>{" "}
                hoặc{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Đăng kí
                </Link>
              </div>
            </div>
            <LoadingButton loading={loading} text={"Đăng nhập"} />
          </form>
        </div>
      </div>
    </div>
  );
}
