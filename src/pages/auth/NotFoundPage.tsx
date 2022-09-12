import { Link } from "react-router-dom";
import { logo2 } from "../../images";

type Props = {};

function NotFoundPage({}: Props) {
  return (
    <>
      <div className="h-screen border-2 pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">Car IT</span>
              <img className="h-20 w-auto" src={logo2} alt="" />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Trang không tồn tại
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Không thể tìm thấy trang bạn yêu cầu
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Trở về trang chủ<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact Support
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Status
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Twitter
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
}

export default NotFoundPage;
