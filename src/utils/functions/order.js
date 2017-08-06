module.exports = (arr) => {
  const a = [];
  let b;
  let c;
  let i;
  while (arr.length > 0) {
    b = arr[0];
    for (let j = 0; j < arr.length; j += 1) {
      if (b.deadline > arr[j].deadline) {
        b = arr[j];
      }
    }
    a.push(b);
    c = 1;
    i = 0;
    while (c) {
      if (b === arr[i].deadline) {
        arr.splice(i, 1);
        c = 0;
      }
      i += 1;
    }
  }
  return a;
};
