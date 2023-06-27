export function getCurrentDate() {
  const date = new Date();
  let finalDate =
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();

  return finalDate;
}

export function completedIn(from, to) {
  const arrFrom = from.split(" ");
  const arrFromDate = arrFrom[0].split("/");
  const arrFromTime = arrFrom[1].split(":");
  const arrTo = to.split(" ");
  const arrToDate = arrTo[0].split("/");
  const arrToTime = arrTo[1].split(":");

  let time = parseInt(arrToDate[2] - arrFromDate[2]);

  time = parseInt(arrToDate[1] - arrFromDate[1]) + time * 12;

  time = parseInt(arrToDate[0] - arrFromDate[0]) + time * 30;

  time = parseInt(arrToTime[0] - arrFromTime[0]) + time * 24;

  time = parseInt(arrToTime[1] - arrFromTime[1]) + time * 60;
  return time;
}
