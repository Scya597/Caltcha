module.exports = (obj) => {
  const nuvote = [];
  const nunvote = [];
  for (let i = 0; i < obj.normaluser.length; i += 1) {
    let b = 1;
    for (let j = 0; j < obj.votes.length; j += 1) {
      if (obj.normaluser[i] === obj.votes[j].userid) {
        nuvote.push(obj.normaluser[i]);
        b = 0;
      }
    }
    if (b) {
      nunvote.push(obj.normaluser[i]);
    }
  }
  const ouvote = [];
  const ounvote = [];
  for (let i = 0; i < obj.optionaluser.length; i += 1) {
    let c = 1;
    for (let j = 0; j < obj.votes.length; j += 1) {
      if (obj.optionaluser[i] === obj.votes[j].userid) {
        ouvote.push(obj.optionaluser[i]);
        c = 0;
      }
    }
    if (c) {
      ounvote.push(obj.optionaluser[i]);
    }
  }
  return {
    normaluser: { vote: nuvote, nvote: nunvote },
    optionaluser: { vote: ouvote, nvote: ounvote },
  };
};
