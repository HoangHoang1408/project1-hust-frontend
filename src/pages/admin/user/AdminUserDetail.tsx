import { UserCircleIcon } from "@heroicons/react/solid";
import { FC, Fragment } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import {
  useGetUserDetailQuery,
  UserRole,
} from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";

type Props = {};
const AdminUserDetail: FC<Props> = () => {
  const params = useParams();
  const { data, loading } = useGetUserDetailQuery({
    variables: {
      input: {
        useId: params.id!,
      },
    },
    onCompleted(data) {
      const { getUserDetail } = data;
      if (getUserDetail.error) {
        toast.error(getUserDetail.error.message);
        return;
      }
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
  const user = data?.getUserDetail.user;
  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && user && (
        <div className="m-8 p-6 rounded shadow">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Thông tin người dùng
            </h3>
          </div>
          <div className="mt-5 border-t border-gray-200 w-full">
            <div className="flex justify-center my-4">
              {user.avatar?.fileUrl && (
                <img
                  className="w-32 h-32 bg-center bg-cover rounded-full"
                  src={user.avatar.fileUrl}
                ></img>
              )}
              {!user.avatar?.fileUrl && (
                <UserCircleIcon className="w-32 h-32" />
              )}
            </div>
            <dl className="">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Tên</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Vai trò</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.role === UserRole.Normal ? "Người dùng" : user.role}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Địa chi</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.address || "Không có thông tin"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Số điện thoại
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phoneNumber || "Không có thông tin"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Đã xác nhận
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.verified ? "Đã xác nhận" : "Chưa xác nhận"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default AdminUserDetail;
