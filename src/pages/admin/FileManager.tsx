import { PaperClipIcon } from "@heroicons/react/outline";
import { SERVER_URL } from "../../config";

type Props = {};

const FileManager = (props: Props) => {
  return (
    <div className="p-6 m-12 rounded bg-white shadow">
      <h1 className="text-indigo-500 font-semibold text-lg">Văn bản mẫu</h1>
      <div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <ul
              role="list"
              className="border border-gray-200 rounded-md divide-y divide-gray-200"
            >
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 flex-1 w-0 truncate">hopdong.docx</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href={SERVER_URL + "/download/contract"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    download
                  >
                    Download
                  </a>
                </div>
              </li>
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 flex-1 w-0 truncate">
                    bienbanbangiao.docx
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href={SERVER_URL + "/download/report"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
