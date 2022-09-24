import { Fragment, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyEmailLazyQuery } from "../../graphql/generated/schema";
import { logo2 } from "../../images";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";

type Props = {};

const VerifyEmailPage = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verify, { loading }] = useVerifyEmailLazyQuery({
    onCompleted({ verifyEmail }) {
      const { ok, error } = verifyEmail;
      if (error) {
        toast.error(error.message);
        return;
      }
      if (ok) {
        toast.success("Đã xác nhận email");
        navigate("/");
      }
    },
    onError(err) {
      const errMsg = getApolloErrorMessage(err);
      if (errMsg) {
        toast.error(errMsg);
        return;
      }
      toast.error("Lỗi server, thử lại sau");
    },
  });
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      return;
    }
    verify({
      variables: {
        input: {
          verificationToken: token,
        },
      },
    });
  }, [searchParams]);
  return (
    <Fragment>
      <div className="h-full grid place-items-center pt-16 pb-12 bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">Car IT</span>
              <img className="h-20 w-auto" src={logo2} alt="" />
            </a>
          </div>
          <div className="py-6">
            <div className="text-center flex flex-col space-y-4">
              <h1 className="mt-2 text-2xl font-extrabold text-gray-700 tracking-tight sm:text-5xl">
                Xác nhận email
              </h1>
              {loading && (
                <h1 className="text-gray-700 text-lg font-semibold">
                  Vui lòng chờ trong giây lát...
                </h1>
              )}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default VerifyEmailPage;
