import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import PaginationNav from "../components/PaginationNav";
import {
  BookingStatusBackEnd,
  CarTypeEnumBackEnd,
} from "../common/enumConstants";
import {
  CarTypeEnum,
  useGetBookingByLazyQuery,
} from "../graphql/generated/schema";
import { getApolloErrorMessage } from "../utils/getApolloErrorMessage";
type ByState = {
  carType?: CarTypeEnum | "all";
  startDate?: Date;
  endDate?: Date;
};

type Props = {};
const UserRenting: FC<Props> = (props) => {
  const [getBookings, { data: bookingData, loading }] =
    useGetBookingByLazyQuery({
      onCompleted(data) {
        const { getBookingsBy } = data;
        if (getBookingsBy.error) {
          toast.error(getBookingsBy.error.message);
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
  const [byState, setByState] = useState<ByState>({
    carType: "all",
  });
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    let { carType, endDate, startDate } = byState;
    if ((endDate && !startDate) || (startDate && !endDate)) return;
    if (carType === "all") carType = undefined;
    getBookings({
      variables: {
        input: {
          pagination: {
            page,
            resultsPerPage: 10,
          },
          carType,
          startDate,
          endDate,
        },
      },
    });
  }, [byState, page]);
  const bookings = bookingData?.getBookingsBy.bookings;
  const columns = useMemo(() => {
    return [
      {
        Header: "Id",
        accessor: (row) => row["id"],
      },
      {
        Header: "Mã thuê",
        accessor: (row) => row["bookingCode"],
      },
      {
        Header: "Loại xe",
        // @ts-ignore
        accessor: (row) => CarTypeEnumBackEnd[row["carType"]["carType"]],
      },
      {
        Header: "Số lượng",
        accessor: (row) => row["quantity"],
      },
      {
        Header: "Trạng thái",
        // @ts-ignore
        accessor: (row) => BookingStatusBackEnd[row["status"]],
      },
      {
        Header: "Bắt đầu",
        accessor: (row) =>
          new Date(row["startDate"]).toLocaleDateString("vn", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
      {
        Header: "Kết thúc",
        accessor: (row) =>
          new Date(row["endDate"]).toLocaleDateString("vn", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
      {
        Header: "Tổng tiền",
        accessor: (row) => row["totalPrice"],
      },
      {
        Header: "Chi tiết",
        //@ts-ignore
        accessor: (row) => row["id"],
        Cell: ({ value }) => {
          return (
            <Link
              to={`/bookings/${value}`}
              className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit"
            >
              Chi tiết
            </Link>
          );
        },
      },
    ];
  }, []);
  const data = useMemo(() => bookings || [], [bookings]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ data, columns });
  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && bookingData && (
        <div className="px-4 sm:px-6 lg:px-8 my-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Danh sách đơn thuê xe
              </h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 flex space-x-3">
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700 font-medium">Loại xe</h1>
                <select
                  onChange={(e) =>
                    //@ts-ignore
                    setByState((pre) => ({ ...pre, carType: e.target.value }))
                  }
                  value={byState.carType}
                  className="appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold"
                >
                  <option value="all">Tất cả</option>
                  {Object.values(CarTypeEnum).map((t, i) => (
                    <option key={i} value={t}>
                      {CarTypeEnumBackEnd[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700 font-medium">Bắt đầu</h1>
                <input
                  onChange={(e) =>
                    //@ts-ignore
                    setByState((pre) => ({
                      ...pre,
                      startDate: new Date(e.target.value),
                    }))
                  }
                  value={
                    byState.startDate
                      ? new Date(byState.startDate).toISOString().split("T")[0]
                      : undefined
                  }
                  type="date"
                  className="appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></input>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700 font-medium">Kết thúc</h1>
                <input
                  onChange={(e) =>
                    //@ts-ignore
                    setByState((pre) => ({
                      ...pre,
                      endDate: new Date(e.target.value),
                    }))
                  }
                  value={
                    byState.endDate
                      ? new Date(byState.endDate).toISOString().split("T")[0]
                      : undefined
                  }
                  type="date"
                  className="appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></input>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-300"
                  >
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6"
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
                  totalPage={bookingData.getBookingsBy.pagination?.totalPages!}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default UserRenting;
