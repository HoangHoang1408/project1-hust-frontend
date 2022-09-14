import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalFilter, useTable } from "react-table";
import { toast } from "react-toastify";
import { CarTypeEnumBackEnd } from "../../../common/enumConstants";
import Loading from "../../../components/Loading";
import PaginationNav from "../../../components/PaginationNav";
import { useGetCarTypesLazyQuery } from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";
type Props = {};
const CarTypeManager = (props: Props) => {
  const navigate = useNavigate();
  const [getCarTypes, { data: carTypesData, loading }] =
    useGetCarTypesLazyQuery({
      onCompleted(data) {
        const { getCarTypes } = data;
        if (getCarTypes.error) {
          toast.error(getCarTypes.error.message);
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
    getCarTypes({
      variables: {
        input: {
          pagination: {
            resultsPerPage: 15,
            page,
          },
        },
      },
    });
  }, [page]);
  const carTypes = carTypesData?.getCarTypes.carTypes;
  const columns = useMemo(() => {
    return [
      {
        Header: "Loại xe",
        // @ts-ignore
        accessor: (row) => CarTypeEnumBackEnd[row["carType"]],
      },
      {
        Header: "Giá thành",
        // @ts-ignore
        accessor: (row) => `${row["price"]}đ`,
      },
      {
        Header: "Quãng đường tối đa",
        // @ts-ignore
        accessor: (row) => `${row["maxDistance"]} km`,
      },
      {
        Header: "Phí phụ trội",
        // @ts-ignore
        accessor: (row) => `${row["additionalDistancePrice"]}đ / km`,
      },
      {
        Header: "Hành động",
        //@ts-ignore
        accessor: (row) => row,
        // @ts-ignore
        Cell: (row) => {
          const data = row["row"]["original"];
          return (
            <div className="space-x-2">
              <button
                onClick={() => {
                  navigate(`/admin/cartypes/${data["carType"]}`);
                }}
                className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit"
              >
                Chi tiết
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/cartypes/update/${data["carType"]}`);
                }}
                className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit"
              >
                Cập nhật
              </button>
            </div>
          );
        },
      },
    ];
  }, []);
  const data = useMemo(() => carTypes || [], [carTypes]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns }, useGlobalFilter);
  return (
    <Fragment>
      <main className="flex-1 mb-8">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 mt-4 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Quản lí loại xe
            </h1>
          </div>
        </div>
        {/* Projects table (small breakpoint and up) */}
        {loading && <Loading />}
        {!loading && carTypes && (
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
                  totalPage={carTypesData.getCarTypes.pagination?.totalPages!}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default CarTypeManager;
