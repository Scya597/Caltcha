module.exports = (arr, num) => {
  const contiarr = [];
  let i = 0;
  let last = 0;
  while (i <= arr.length - num) {
    if (arr[i + (num - 1)] - arr[i] !== num - 1 && last === 0) {
      i += 1;
    } else if (arr[i + (num - 1)] - arr[i] === num - 1 && last === 0) {
      if (i === arr.length - num) {
        for (let k = 0; k < num; k += 1) {
          contiarr.push(arr[i + k]);
          i += 1;
        }
      } else {
        contiarr.push(arr[i]);
        i += 1;
        last = 1;
      }
    } else if (arr[i + (num - 1)] - arr[i] === num - 1 && last === 1) {
      if (i === arr.length - num) {
        for (let k = 0; k < num; k += 1) {
          contiarr.push(arr[i + k]);
          i += 1;
        }
      } else {
        contiarr.push(arr[i]);
        i += 1;
      }
    } else {
      for (let k = 0; k < num - 1; k += 1) {
        contiarr.push(arr[i + k]);
        i += num - 1;
        last = 0;
      }
    }
  }
  return contiarr;
};
