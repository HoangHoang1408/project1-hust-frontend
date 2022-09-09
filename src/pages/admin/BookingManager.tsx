import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import {
  BookingStatusBackEnd,
  CarTypeEnumBackEnd,
} from "../../common/enumConstants";
import TextSearchInput from "../../components/form/TextSearchInput";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import PaginationNav from "../../components/PaginationNav";
import {
  BookingStatus,
  CarTypeEnum,
  useGetBookingByLazyQuery,
  useUpdateBookingStatusMutation,
} from "../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../utils/getApolloErrorMessage";
type ByState = {
  carType?: CarTypeEnum | "all";
  startDate?: Date;
  endDate?: Date;
  bookingStatus?: BookingStatus | "all";
  textSearch?: string;
};
type ModalState = {
  open: boolean;
  bookingCode?: string;
  status?: BookingStatus;
  bookingId?: string;
};
type Props = {};
const BookingManager = (props: Props) => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
  });
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
      fetchPolicy: "cache-and-network",
    });
  const [byState, setByState] = useState<ByState>({
    carType: "all",
  });
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    let { carType, endDate, startDate, bookingStatus, textSearch } = byState;
    if ((endDate && !startDate) || (startDate && !endDate)) return;
    if (carType === "all") carType = undefined;
    if (bookingStatus === "all") bookingStatus = undefined;
    getBookings({
      variables: {
        input: {
          pagination: {
            page,
            resultsPerPage: 15,
          },
          carType,
          startDate,
          endDate,
          bookingCode: textSearch,
          bookingStatus,
        },
      },
    });
  }, [byState, page]);
  const bookings = bookingData?.getBookingsBy.bookings;
  const columns = useMemo(() => {
    return [
      {
        Header: "Mã thuê",
        // @ts-ignore
        accessor: (row) => row["bookingCode"],
      },
      {
        Header: "Loại xe",
        // @ts-ignore
        accessor: (row) => CarTypeEnumBackEnd[row["carType"]["carType"]],
      },
      {
        Header: "Số lượng",
        // @ts-ignore
        accessor: (row) => row["quantity"],
      },
      {
        Header: "Trạng thái",
        // @ts-ignore
        accessor: (row) => BookingStatusBackEnd[row["status"]],
      },
      {
        Header: "Bắt đầu",
        // @ts-ignore
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
        // @ts-ignore
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
        // @ts-ignore
        accessor: (row) => row["totalPrice"],
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
                  navigate(`/admin/bookings/${data["id"]}`);
                }}
                className="font-semibold text-indigo-500 cursor-pointer hover:text-indigo-700 p-1 hover:bg-indigo-300 text-left rounded transition w-fit"
              >
                Chi tiết
              </button>
              <button
                onClick={() => {
                  setModalState((pre) => ({
                    ...pre,
                    open: true,
                    bookingCode: data["bookingCode"],
                    bookingId: data["id"],
                    status: data["status"],
                  }));
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
  const data = useMemo(() => bookings || [], [bookings]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });
  const [updateStatus, { loading: updateStatusLoading }] =
    useUpdateBookingStatusMutation({
      onCompleted(data) {
        const { updateBookingStatus } = data;
        if (updateBookingStatus.error) {
          toast.error(updateBookingStatus.error.message);
          return;
        }
        toast.success("Cập nhật thành công");
      },
      onError(error) {
        const msg = getApolloErrorMessage(error);
        if (msg) {
          toast.error(msg);
          return;
        }
        toast.error("Lỗi xảy ra, thử lại sau");
      },
      refetchQueries: ["GetBookingBy", "ForecastTable"],
    });
  return (
    <Fragment>
      <Modal
        open={modalState.open}
        setClose={() => setModalState((pre) => ({ ...pre, open: false }))}
        actionText="Cập nhật"
        action={() => {
          if (!modalState.status) {
            toast.warn("Chọn trạng thái mới");
            return;
          }
          updateStatus({
            variables: {
              input: {
                bookingId: +modalState.bookingId!,
                status: modalState.status,
              },
            },
          });
        }}
        children={
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl text-indigo-700 font-semibold text-center">
              Cập nhật trạng thái
            </h1>
            <div className="grid grid-cols-12 space-x-2">
              <h1 className="col-span-4">Mã thuê:</h1>
              <h1 className="col-span-8">{modalState.bookingCode}</h1>
            </div>
            <div className="grid grid-cols-12 items-center">
              <label className="block text-sm font-medium text-gray-700 text-start col-span-4">
                Trạng thái
              </label>
              <div className="col-span-8">
                <select
                  onChange={(e) =>
                    setModalState((pre) => ({
                      ...pre,
                      status: e.target.value as BookingStatus,
                    }))
                  }
                  value={modalState.status}
                  className="appearance-none block w-full px-2 py-1 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 font-semibold rounded"
                >
                  {Object.values(BookingStatus).map((t, i) => (
                    <option key={i} value={t}>
                      {BookingStatusBackEnd[t]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        }
      />
      <main className="flex-1 mb-8">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 mt-4 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Quản lí các đơn thuê
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 flex space-x-3 items-end">
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
                className="appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold py-1"
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
                className="appearance-none block w-full px-2 h-full border border-gray-300 shadow-sm rounded-none placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold py-1"
              >
                <option value="all">Tất cả</option>
                {Object.values(BookingStatus).map((t, i) => (
                  <option key={i} value={t}>
                    {BookingStatusBackEnd[t]}
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
            <button
              onClick={() => navigate("/admin/bookings/forecast")}
              className="w-fit h-fit flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Forecast
            </button>
          </div>
        </div>
        {/* Projects table (small breakpoint and up) */}
        {loading && <Loading />}
        {!loading && bookingData && (
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
                  totalPage={bookingData.getBookingsBy.pagination?.totalPages!}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default BookingManager;
