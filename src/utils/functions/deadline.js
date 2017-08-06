const tdtn = require('../../../server/api/controllers/functions/tdtn');

module.exports = (num) => {
  const currentdate = new Date();
  const year = currentdate.getFullYear() * 10000;
  const month = (currentdate.getMonth() + 1) * 100;
  const date = currentdate.getDate();
  const days = year + month + date;
  let hour = currentdate.getHours();
  const minute = currentdate.getMinutes();
  if (minute >= 30) {
    hour += 1;
  }
  const numresult = (tdtn(num) + 1) * 24;
  const nowresult = (tdtn(days) * 24) + hour;
  return numresult - nowresult;
};
