module.exports = (num) => {
  const year = Math.floor(num / 10000);
  const month = Math.floor((num - (10000 * year)) / 100);
  const day = num - (10000 * year) - (100 * month);
  const a = year - 2017;
  const b = Math.floor(a / 4);
  const c = a % 4;
  const yearday = (b * 1461) + (c * 365);
  let monthday;
  if (c !== 3) {
    if (month === 1) {
      monthday = 0;
    } else if (month === 2) {
      monthday = 31;
    } else if (month === 3) {
      monthday = 59;
    } else if (month === 4) {
      monthday = 90;
    } else if (month === 5) {
      monthday = 120;
    } else if (month === 6) {
      monthday = 151;
    } else if (month === 7) {
      monthday = 181;
    } else if (month === 8) {
      monthday = 212;
    } else if (month === 9) {
      monthday = 243;
    } else if (month === 10) {
      monthday = 273;
    } else if (month === 11) {
      monthday = 304;
    } else {
      monthday = 334;
    }
  } else if (month === 1) {
    monthday = 0;
  } else if (month === 2) {
    monthday = 31;
  } else if (month === 3) {
    monthday = 60;
  } else if (month === 4) {
    monthday = 91;
  } else if (month === 5) {
    monthday = 121;
  } else if (month === 6) {
    monthday = 152;
  } else if (month === 7) {
    monthday = 182;
  } else if (month === 8) {
    monthday = 213;
  } else if (month === 9) {
    monthday = 244;
  } else if (month === 10) {
    monthday = 274;
  } else if (month === 11) {
    monthday = 305;
  } else {
    monthday = 335;
  }
  const days = yearday + monthday + (day - 1);
  return days;
};
