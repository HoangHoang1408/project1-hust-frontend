import { useReactiveVar } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userVar } from "../../apollo/reactiveVar/loginStatus";
import { SERVER_URL } from "../../config";
import {
  UpdateUserInput,
  useUpdateUserMutation,
} from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
import { FormInput } from "../form/FormInput";
import LoadingButton from "../form/LoadingButton";
interface UpdateUserInputForm {
  name: string;
  address?: string;
  phoneNumber?: string;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const updateUserInputSchema = yup.object().shape({
  name: yup.string().required("Cần điền tên"),
  address: yup.string(),
  phoneNumber: yup.string(),
});

type Props = {};
const Profile: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm<UpdateUserInputForm>({
    resolver: yupResolver(updateUserInputSchema),
    mode: "onBlur",
  });
  const [loadingMain, setLoadingMain] = useState(false);
  const user = useReactiveVar(userVar);
  const [image, setImage] = useState<File>();
  const [updateUser] = useUpdateUserMutation({
    onCompleted(data) {
      setLoadingMain(false);
      const { updateUser } = data;
      if (updateUser.error) {
        toast.error(updateUser.error.message);
        return;
      }

      toast.success("Cập nhật thành công!");
    },
    onError(err) {
      setLoadingMain(false);
      const message = getApolloErrorMessage(err);
      if (message) {
        toast.error(message);
        return;
      }
      toast.error("Lỗi server, thử lại sau");
    },
    refetchQueries: ["User"],
  });
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const submitHandler = async () => {
    const { name, address, phoneNumber } = getValues();
    if (phoneNumber) console.log("hello");
    if (phoneNumber && !phoneRegExp.test(phoneNumber)) {
      setError("phoneNumber", {
        message: "Sai định dạng số điện thoại",
      });
      return;
    }
    setLoadingMain(true);
    const input: UpdateUserInput = {
      name,
      address,
      phoneNumber: phoneNumber || undefined,
    };
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("storagePath", "user/avatars");
        const res = await axios.post(SERVER_URL + "/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        input.avatar = res.data.fileReference;
        if (user?.avatar)
          await axios.post(SERVER_URL + "/delete/file", {
            storagePath: user?.avatar.filePath,
          });
      } catch (err) {
        const errMessage = (err as AxiosError<{ message: string }>).response
          ?.data.message;
        if (errMessage) {
          toast.error(errMessage);
          return;
        }
        toast.error("Lỗi xảy ra, thử lại sau");
        setLoadingMain(false);
        return;
      }
    }
    await updateUser({
      variables: {
        input,
      },
    });
    setLoadingMain(false);
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="divide-y divide-gray-200 lg:col-span-9"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Hồ sơ</h2>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <div className="mt-6 flex flex-col lg:flex-row justify-center">
              <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0 flex flex-col">
                <p
                  className="text-sm font-medium text-gray-700"
                  aria-hidden="true"
                >
                  Ảnh
                </p>
                <div className="self-center">
                  <div className="relative rounded-full w-40 overflow-hidden">
                    {image && (
                      <img
                        className="relative rounded-full w-40 h-40"
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    )}
                    {user?.avatar?.fileUrl && !image && (
                      <img
                        className="relative rounded-full w-40 h-40"
                        src={user.avatar.fileUrl}
                        alt=""
                      />
                    )}
                    {!user?.avatar?.fileUrl && !image && (
                      <svg
                        className="relative rounded-full w-40 h-40"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <label
                      htmlFor="desktop-user-photo"
                      className="absolute inset-0 w-40 h-40 rounded-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                      <input
                        onChange={(e) => {
                          if (e.target.files) setImage(e.target.files[0]);
                          //@ts-ignore
                          e.target.value = null;
                        }}
                        type="file"
                        id="desktop-user-photo"
                        name="user-photo"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col space-y-2">
            <div>
              <h1 className="block text-sm font-medium text-gray-700">Email</h1>
              <div className="mt-1">
                <h1 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {user?.email}
                </h1>
              </div>
            </div>
            <FormInput
              labelText="Tên"
              registerReturn={register("name")}
              id="name"
              errorMessage={errors.name?.message}
              type="text"
            />
            <FormInput
              labelText="Địa chỉ"
              registerReturn={register("address")}
              id="address"
              defaultValue={user?.address}
              errorMessage={errors.address?.message}
              type="text"
            />
            <FormInput
              labelText="Số điện thoại"
              registerReturn={register("phoneNumber")}
              id="phoneNumber"
              errorMessage={errors.phoneNumber?.message}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <div className="w-full sm:w-fit">
          <LoadingButton loading={loadingMain} text="Cập nhật" />
        </div>
      </div>
    </form>
  );
};

export default Profile;
