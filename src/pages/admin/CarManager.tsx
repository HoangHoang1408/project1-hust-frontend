import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import { CarTypeEnumBackEnd } from "../../common/enumConstants";
import TextSearchInput from "../../components/form/TextSearchInput";
import Loading from "../../components/Loading";
import PaginationNav from "../../components/PaginationNav";
import {
  CarTypeEnum,
  useGetCarsByLazyQuery,
} from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
type Props = {};
type ByState = {
  carType?: CarTypeEnum | "all";
  textSearch?: string;
};
const CarManager = (props: Props) => {
  const navigate = useNavigate();
  const [byState, setByState] = useState<ByState>({
    carType: "all",
  });
  const [page, setPage] = useState<number>(1);
  const [getCars, { data: carsData, loading }] = useGetCarsByLazyQuery({
    onCompleted(data) {
      const { getCarsBy } = data;
      if (getCarsBy.error) {
        toast.error(getCarsBy.error.message);
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
    let { carType, textSearch } = byState;
    if (carType === "all") carType = undefined;
    getCars({
      variables: {
        input: {
          carType,
          pagination: {
            page,
            resultsPerPage: 15,
          },
        },
      },
    });
  }, [byState, page]);
  const cars = carsData?.getCarsBy.cars;
  const columns = useMemo(() => {
    return [
      {
        Header: "Tên xe",
        // @ts-ignore
        accessor: (row) => row["name"],
      },
      {
        Header: "Biển số",
        // @ts-ignore
        accessor: (row) => row["licensePlate"],
      },
      {
        Header: "Hãng xe",
        // @ts-ignore
        accessor: (row) => row["carBrand"],
      },
      {
        Header: "Loại xe",
        // @ts-ignore
        accessor: (row) => CarTypeEnumBackEnd[row["carType"]["carType"]],
      },
      {
        Header: "Hành động",
        //@ts-ignore
        accessor: (row) => row,
        // @ts-ignore
        Cell: (row) => {
          const data = row["row"]["original"];
          return (
            <div className="space-x-1">
              <button
                onClick={() => {
                  navigate(`/admin/cars/${data["id"]}`);
                }}
                className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit"
              >
                Chi tiết
              </button>
              <button className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit">
                Cập nhật
              </button>
              <button className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit">
                Trạng thái
              </button>
            </div>
          );
        },
      },
    ];
  }, []);
  const data = useMemo(() => cars || [], [cars]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });

  return (
    <Fragment>
      <main className="flex-1 mb-8">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 mt-4 py-4 flex items-center justify-between px-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Quản lí xe
            </h1>
          </div>
          <div className="sm:ml-16 flex items-end h-full space-x-3">
            <TextSearchInput
              labelText="Mã thuê"
              setText={(v) => setByState((pre) => ({ ...pre, textSearch: v }))}
              text={byState.textSearch}
              className="py-1"
            />
            <div className="flex flex-col space-y-1">
              <h1 className="text-gray-700 font-medium">Loại xe</h1>
              <select
                onChange={(e) =>
                  //@ts-ignore
                  setByState((pre) => ({ ...pre, carType: e.target.value }))
                }
                value={byState.carType}
                className="appearance-none block w-full px-2 py-1 h-full border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold"
              >
                <option value="all">Tất cả</option>
                {Object.values(CarTypeEnum).map((t, i) => (
                  <option key={i} value={t}>
                    {CarTypeEnumBackEnd[t]}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => navigate("/admin/cars/create")}
              className="w-fit h-fit flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Thêm xe
            </button>
            {/* <div className="flex flex-col space-y-1">
              <h1 className="text-gray-700 font-medium">Trạng thái</h1>
              <select
                onChange={(e) =>
                  //@ts-ignore
                  setByState((pre) => ({
                    ...pre,
                    bookingStatus: e.target.value,
                  }))
                }
                value={byState.bookingStatus}
                className="appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold"
              >
                <option value="all">Tất cả</option>
                {Object.values(BookingStatus).map((t, i) => (
                  <option key={i} value={t}>
                    {BookingStatusBackEnd[t]}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </div>
        {/* Projects table (small breakpoint and up) */}
        {loading && <Loading />}
        {!loading && cars && (
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
                  totalPage={carsData.getCarsBy.pagination?.totalPages!}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default CarManager;
