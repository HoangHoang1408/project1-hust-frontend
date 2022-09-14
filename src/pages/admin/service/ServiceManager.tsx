import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import TextSearchInput from "../../../components/form/TextSearchInput";
import Loading from "../../../components/Loading";
import PaginationNav from "../../../components/PaginationNav";
import {
  useDeleteServiceMutation,
  useGetServicesByLazyQuery,
} from "../../../graphql/generated/schema";
import { loadingWhite } from "../../../images";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";
type Props = {};
type ByState = {
  serviceName?: string;
};
const ServiceManager = (props: Props) => {
  const navigate = useNavigate();
  const [byState, setByState] = useState<ByState>({
    serviceName: "",
  });
  const [deleteService, { loading: deleteServiceLoading }] =
    useDeleteServiceMutation({
      onCompleted(data) {
        const { deleteService } = data;
        if (deleteService.error) {
          toast.error(deleteService.error.message);
          return;
        }
        toast.success("Đã xoá nội dung");
      },
      onError(err) {
        const msg = getApolloErrorMessage(err);
        if (msg) {
          toast.error(msg);
          return;
        }
        toast.error("Lôi xảy ra, thử lại sau");
      },
      refetchQueries: ["GetServicesBy"],
    });
  const [getServices, { data: servicesData, loading }] =
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
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const { serviceName } = byState;
    getServices({
      variables: {
        input: {
          serviceName: serviceName || undefined,
          pagination: {
            page,
            resultsPerPage: 15,
          },
        },
      },
    });
  }, [page, byState]);
  const services = servicesData?.getServices.services;
  const columns = useMemo(() => {
    return [
      {
        Header: "Tên dịch vụ",
        // @ts-ignore
        accessor: (row) => row["serviceName"],
      },
      {
        Header: "Giá thành",
        // @ts-ignore
        accessor: (row) => `${row["servicePrice"]}đ`,
      },
      {
        Header: "Mô tả",
        // @ts-ignore
        accessor: (row) => `${row["description"]}`,
      },
      {
        Header: "Theo ngày",
        // @ts-ignore
        accessor: (row) => `${row["perDay"] ? "Có" : "Không"}`,
      },
      {
        Header: "Hành động",
        //@ts-ignore
        accessor: (row) => row,
        // @ts-ignore
        Cell: (row) => {
          const data = row["row"]["original"];
          return (
            <div className="space-x-2 flex items-center">
              <button
                onClick={() => {
                  navigate(`/admin/services/update/${data["id"]}`);
                }}
                className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 rounded transition w-max h-9 flex items-center text-center"
              >
                Cập nhật
              </button>
              <button
                disabled={deleteServiceLoading}
                onClick={() => {
                  deleteService({
                    variables: {
                      input: {
                        id: data["id"],
                      },
                    },
                  });
                }}
                className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 rounded transition w-max h-9 flex items-center text-center"
              >
                {!deleteServiceLoading && <p>Xoá</p>}
                {deleteServiceLoading && (
                  <img className="w-8 h-8" src={loadingWhite} />
                )}
              </button>
            </div>
          );
        },
      },
    ];
  }, []);
  const data = useMemo(() => services || [], [services]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });
  return (
    <Fragment>
      <main className="flex-1 mb-8">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 mt-4 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Quản lí dịch vụ
            </h1>
          </div>
          <div className="sm:ml-16 flex items-end h-full space-x-3">
            <TextSearchInput
              labelText="Tên dịch vụ"
              setText={(v) => setByState((pre) => ({ ...pre, serviceName: v }))}
              text={byState?.serviceName}
              className="py-1"
            />
            <button
              onClick={() => navigate("/admin/services/create")}
              className="w-fit h-fit flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Thêm dịch vụ
            </button>
          </div>
        </div>
        {/* Projects table (small breakpoint and up) */}
        {loading && <Loading />}
        {!loading && services && (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                  <table
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-300"
                  >
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              className="py-3.5 px-2 text-left text-sm font-semibold text-gray-900"
                              {...column.getHeaderProps()}
                            >
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className="divide-y divide-gray-200 bg-white"
                    >
                      {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  className="whitespace-nowrap py-[0.5rem] px-2 text-sm font-medium text-gray-600"
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationNav
                  currentPage={page}
                  setCurrentPage={setPage}
                  totalPage={servicesData.getServices.pagination?.totalPages!}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default ServiceManager;
