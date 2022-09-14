import { XIcon } from "@heroicons/react/solid";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ServiceFragmentFragment,
  useGetServicesByLazyQuery,
} from "../../graphql/generated/schema";
import { loadingWhite } from "../../images";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
import TextSearchInput from "../form/TextSearchInput";
import Modal from "../Modal";

type Props = {
  open: boolean;
  setClose: () => void;
  action: (s: ServiceFragmentFragment[]) => void;
};

const Step1Modal = ({ open, setClose, action }: Props) => {
  const [modalState, setModalState] = useState<{
    serviceName?: string;
    services: ServiceFragmentFragment[];
    serviceId: Set<String>;
    canSearch: boolean;
  }>({
    serviceName: "",
    canSearch: false,
    services: [],
    serviceId: new Set(),
  });
  const [getServices, { data: servicesData, loading: serviceLoading }] =
    useGetServicesByLazyQuery({
      onCompleted(data) {
        const { getServices } = data;
        if (getServices.error) {
          toast.error(getServices.error.message);
          return;
        }
      },
      onError(err) {
        const msg = getApolloErrorMessage(err);
        if (msg) {
          toast.error(msg);
          return;
        }
        toast.error("Lôi xảy ra, thử lại sau");
      },
    });
  useEffect(() => {
    if (!modalState.canSearch) return;
    const { serviceName } = modalState;
    getServices({
      variables: {
        input: {
          serviceName: serviceName,
          pagination: {
            page: 1,
            resultsPerPage: 5,
          },
        },
      },
    });
  }, [modalState]);
  const services = servicesData?.getServices.services;
  return (
    <Modal
      open={open}
      setClose={setClose}
      actionText="Thêm"
      action={() => action(modalState.services)}
      children={
        <div className="text-base flex flex-col space-y-5">
          <h1 className="text-center text-xl font-semibold text-indigo-600">
            Tìm kiếm dịch vụ
          </h1>
          <div
            className="relative"
            onFocus={() =>
              setModalState((pre) => {
                const temp = cloneDeep(pre);
                temp.canSearch = true;
                return temp;
              })
            }
          >
            <TextSearchInput
              labelText="Tên dịch vụ"
              setText={(v) =>
                setModalState((pre) => ({ ...pre, serviceName: v }))
              }
              text={modalState?.serviceName}
              className="py-1"
            />
            {serviceLoading && (
              <div>
                <img className="w-6 h-6" src={loadingWhite} alt="" />
              </div>
            )}
            {services && modalState.canSearch && (
              <div className="absolute top-full left-0 bg-white p-2 rounded w-full shadow flex flex-col space-y-1">
                {services.slice(0, Math.max(services.length, 4)).map((s, i) => (
                  <div
                    onClick={() => {
                      setModalState((pre) => {
                        const temp = cloneDeep(pre);
                        if (!temp.serviceId.has(s.id)) {
                          temp.services.push(s);
                          temp.serviceId.add(s.id);
                        }
                        temp.canSearch = false;
                        return temp;
                      });
                    }}
                    key={i}
                    className="p-1 hover:bg-indigo-200 rounded cursor-pointer"
                  >
                    {s.serviceName}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-2 rounded">
            <div>
              <div className="grid grid-cols-12 mb-1 font-semibold text-indigo-700">
                <div className="col-span-7">Tên dịch vụ</div>
                <div className="col-span-4">Giá thành</div>
              </div>
              <div className="w-4 h-2"></div>
            </div>
            <div className="flex flex-col space-y-2 text-base">
              {modalState.services &&
                modalState.services.map((e, i) => (
                  <div key={i} className="flex space-x-2">
                    <div className="grid gap-1 grid-cols-12 grow">
                      <div className="col-span-7">{e.serviceName}</div>
                      <div className="col-span-4">
                        {e.servicePrice}đ {e.perDay ? "/ngày" : "/lượt"}
                      </div>
                      <div
                        onClick={() => {
                          setModalState((pre) => {
                            const temp = cloneDeep(pre);
                            temp.serviceId.delete(e.id);
                            temp.services = temp.services.filter(
                              (t) => t.id !== e.id
                            );
                            return temp;
                          });
                        }}
                        className="col-span-1 rounded-full w-fit cursor-pointer hover:bg-indigo-200"
                      >
                        <XIcon className="h-6 w-6 text-indigo-500 " />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Step1Modal;
