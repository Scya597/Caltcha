module.exports = (arr, num) => {
  const contiarr = [];
  let i = 0;
  let middle;
  while (i <= arr.length - num) {
    middle = [];
    if (arr[i + (num - 1)] - arr[i] === num - 1) {
      for (let j = 0; j < num; j += 1) {
        middle.push(arr[i + j]);
      }
      contiarr.push(middle);
      i += 1;
    } else {
      i += 1;
    }
  }
  return contiarr;
};
