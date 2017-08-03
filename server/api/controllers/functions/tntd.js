module.exports = (arr) => {
  const shit = [];
  for (let i = 0; i < arr.length; i += 1) {
    const a = Math.ceiling(arr[i] / 48);
    const b = arr[i] % 48;
    let q;
    if (b === 0) {
      q = 48;
    } else {
      q = b;
    }
    const c = a % 1461;
    const d = Math.ceiling(a / 1461);
    const e = Math.ceiling(c / 365);
    const f = c % 365;
    let days = 20160000;
    if (e === 5) {
      days += d * 40000;
      days += 1231;
    } else {
      let y = (d - 1) * 40000;
      y += e * 10000;
      days += y;
      if (e === 4) {
        if (f === 0) {
          days += 1230;
        } else if (f <= 31) {
          days = days + 100 + f;
        } else if (f <= 60) {
          days = days + 169 + f;
        } else if (f <= 91) {
          days = days + 240 + f;
        } else if (f <= 121) {
          days = days + 309 + f;
        } else if (f <= 152) {
          days = days + 379 + f;
        } else if (f <= 182) {
          days = days + 448 + f;
        } else if (f <= 213) {
          days = days + 518 + f;
        } else if (f <= 244) {
          days = days + 587 + f;
        } else if (f <= 274) {
          days = days + 656 + f;
        } else if (f <= 305) {
          days = days + 726 + f;
        } else if (f <= 335) {
          days = days + 795 + f;
        } else {
          days = days + 865 + f;
        }
      } else if (f === 0) {
        days += 1231;
      } else if (f <= 31) {
        days = days + 100 + f;
      } else if (f <= 59) {
        days = days + 169 + f;
      } else if (f <= 90) {
        days = days + 241 + f;
      } else if (f <= 120) {
        days = days + 310 + f;
      } else if (f <= 151) {
        days = days + 380 + f;
      } else if (f <= 181) {
        days = days + 449 + f;
      } else if (f <= 212) {
        days = days + 519 + f;
      } else if (f <= 243) {
        days = days + 588 + f;
      } else if (f <= 273) {
        days = days + 657 + f;
      } else if (f <= 304) {
        days = days + 727 + f;
      } else if (f <= 334) {
        days = days + 796 + f;
      } else {
        days = days + 866 + f;
      }
    }
    let boo;
    if (i === 0) {
      shit.push({ date: days, time: [q] });
    } else {
      boo = 1;
      for (let j = 0; j < shit.length; j += 1) {
        if (shit[j].date === days) {
          shit[j].time.push(q);
          boo = 0;
        }
      }
      if (boo) {
        shit.push({ date: days, time: [q] });
      }
    }
  }
};
