import axios from 'axios';

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
  // const nv = [];
  // for (let i = 0; i < nuvote.length; i += 1) {
  //   axios.get(`/api/user/${nuvote[i]}`)
  //     .then((res) => {
  //       const a = res.data;
  //       console.log('dfg');
  //       console.log(res.data);
  //       nv.push(a);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // const nnv = [];
  // for (let i = 0; i < nunvote.length; i += 1) {
  //   axios.get(`/api/user/${nuvote[i]}`)
  //     .then((res) => {
  //       const a = res.data;
  //       console.log(res.data);
  //       nnv.push(a);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // const ov = [];
  // for (let i = 0; i < ouvote.length; i += 1) {
  //   axios.get(`/api/user/${nunvote[i]}`)
  //     .then((res) => {
  //       const a = res.data;
  //       ov.push(a);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // const onv = [];
  // for (let i = 0; i < ounvote.length; i += 1) {
  //   axios.get(`/api/user/${ounvote[i]}`)
  //     .then((res) => {
  //       const a = res.data;
  //       onv.push(a);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // const c = [];
  // for (let i = 0; i < obj.closeduser.length; i += 1) {
  //   axios.get(`/api/user/${nuvote[i]}`)
  //     .then((res) => {
  //       const a = res.data;
  //       c.push(a);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  return {
    normaluser: { vote: nuvote, nvote: nunvote },
    optionaluser: { vote: ouvote, nvote: ounvote },
    closeduser: obj.closeduser,
  };
};
