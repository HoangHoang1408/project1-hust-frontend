import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { loginStatusVar, userVar } from "../apollo/reactiveVar/loginStatus";
import { useUserLazyQuery } from "../graphql/generated/schema";

export function useGetUser() {
  const [userQuery] = useUserLazyQuery({
    onCompleted(data) {
      const {
        getDetailUser: { user, error },
      } = data;
      if (error || !user) toast.error("Không thể nhận thông tin người dùng");
      userVar(user);
    },
    onError(err) {
      console.log(err);
      toast.error("Lỗi server, thử lại sau");
    },
    fetchPolicy: "network-only",
  });
  const user = useReactiveVar(userVar);
  const loginStatus = useReactiveVar(loginStatusVar);
  useEffect(() => {
    if (!loginStatus) return;
    if (!loginStatus.isLoggedIn) return;
    if (!user) userQuery();
  }, [user, loginStatus]);
}
