const data = [
  {
    vehicleId: 1,
    endDate: new Date("2022-08-20"),
    startDate: new Date("2022-08-24"),
  },
  {
    vehicleId: 2,
    endDate: new Date("2022-08-21"),
    startDate: new Date("2022-08-25"),
  },
  {
    vehicleId: 3,
    endDate: new Date("2022-08-26"),
    startDate: new Date("2022-08-28"),
  },
];
function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  date.setDate(date.getDate());
  const dates = [];
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}
function processData1(startDate, endDate, st, en) {
  const temp = Object.fromEntries(
    getDatesInRange(startDate, endDate).map((date) => [
      `${date.getDate()}/${date.getMonth()}`,
      false,
    ])
  );
  const a = getDatesInRange(st, en);
  console.log(a);
  a.forEach((date) => {
    const hello = `${date.getDate()}/${date.getMonth()}`;
    temp["sdfdsf"] = true;
  });
  return temp;
}
const processData = (startDate, endDate, data) => {
  const temp = data.map((d) => {
    return {
      vehicleId: d.vehicleId,
      dates: processData1(startDate, endDate, d.startDate, d.endDate),
    };
  });
  console.log(temp);
};
const a1 = new Date("2022-08-18");
const a2 = new Date("2022-08-29");
processData(a1, a2, data);
console.log(
  getDatesInRange(new Date(data[0].startDate), new Date(data[0].endDate))
);
