import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import { CarTypeEnumBackEnd } from "../../../common/enumConstants";
import Loading from "../../../components/Loading";
import {
  BookingStatus,
  CarTypeEnum,
  useForecastTableLazyQuery,
} from "../../../graphql/generated/schema";
import { getApolloErrorMessage } from "../../../utils/getApolloErrorMessage";
type Props = {};
type ByState = {
  carType?: CarTypeEnum;
  startDate: Date;
  endDate: Date;
};

const ForecastTable: FC<Props> = (props) => {
  const [byState, setByState] = useState<ByState>({
    carType: CarTypeEnum.Seat4,
    startDate: new Date(
      new Date(new Date().toISOString().split("T")[0]).getTime() - 86400000 * 10
    ),
    endDate: new Date(
      new Date(new Date().toISOString().split("T")[0]).getTime() + 86400000 * 10
    ),
  });
  const [foreCast, { data: foreCastData, loading }] = useForecastTableLazyQuery(
    {
      onCompleted(data) {
        const { forecastTable } = data;
        if (forecastTable.error) {
          toast.error(forecastTable.error.message);
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
      fetchPolicy: "network-only",
    }
  );
  useEffect(() => {
    let { carType, startDate, endDate } = byState;
    if (!carType) return;
    if (!(startDate && endDate)) return;
    foreCast({
      variables: {
        input: {
          carType,
          startDate,
          endDate,
        },
      },
    });
  }, [byState]);
  const tableData = foreCastData?.forecastTable.tableData;
  const columns = useMemo(() => {
    let cl = [
      {
        Header: "Tên xe",
        // @ts-ignore
        accessor: (row) => row["car"]["name"],
        // @ts-ignore
        Cell(row) {
          const car = row["row"]["original"]["car"];
          return (
            <div className="text-sm w-full h-full text-gray-700 font-semibold">
              <h1>Tên: {car["name"]}</h1>
              <h1>Biển số: {car["licensePlate"]}</h1>
            </div>
          );
        },
      },
    ];
    if (tableData) {
      tableData[0].dayDatas.forEach((data, i) =>
        cl.push({
          Header: `${new Date(data.day).getDate()}/${
            new Date(data.day).getMonth() + 1
          }`,
          // @ts-ignore
          accessor: (row) => {
            return row["dayDatas"][i]["status"];
          },
          // @ts-ignore
          Cell(row) {
            const data = row["row"]["original"]["dayDatas"][i]["status"];
            if (data === BookingStatus.Deposited)
              return <div className="w-full h-12 bg-yellow-500"></div>;
            if (data === BookingStatus.VehicleTaken)
              return <div className="w-full h-12 bg-red-500"></div>;
            return <div className="w-full h-12"></div>;
          },
        })
      );
    }
    cl.push({
      Header: "Tổng kết",
      // @ts-ignore
      accessor: (row) => row["car"]["name"],
      // @ts-ignore
      Cell(row) {
        const data = row["row"]["original"]["rowSumary"];
        return <h1 className="">{data}</h1>;
      },
    });
    return cl;
  }, [tableData]);
  const data = useMemo(() => tableData || [], [tableData]);
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
        {/* Projects table (small breakpoint and up) */}
        {loading && <Loading />}
        {!loading && tableData && (
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
                              className="p-1 text-center text-sm text-gray-900"
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
                                  className="whitespace-nowrap py-1 px-1 text-sm text-center font-medium text-gray-600 border"
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
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default ForecastTable;
