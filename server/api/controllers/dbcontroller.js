import { Team, User, Project } from '../models/Post';

const tdtn = require('./functions/tdtn');
const tntd = require('./functions/tntd');
const conti = require('./functions/conti');
const test = require('../../../test.json');
const clone = require('./functions/clone');


// const dbteams = [];
// Team.find((err, a) => {
//   a.forEach((b) => {
//     dbteams.push(b);
//   })
// });
// const dbusers = [];
// User.find((err, c) => {
//   c.forEach((d) => {
//     dbusers.push(d);
//   })
// });
// const dbprojects = [];
// Project.find((err, e) => {
//   e.forEach((f) => {
//     dbprojects.push(f);
//   })
// });



const teams = test.team;
const users = test.user;
const projects = test.project;

module.exports = {
  getteamanduser(req, res) {
    const dbteams = [];
    Team.find((err, a) => {
      a.forEach((b) => {
        dbteams.push(b);
      })
      const dbusers = [];
      User.find((err, c) => {
        c.forEach((d) => {
          dbusers.push(d);
        })
        console.log(`${req.user.id} call /api/profile`);
        const sendteam = dbteams.filter((team) => {
          return (typeof req.user.team.find(item => (item === team.id)) !== 'undefined');
        });
        const senduser = req.user;
        senduser.password = 'undefined';
        sendteam.forEach(team => team.members.forEach(userObj => Object.defineProperty(userObj, 'email', {
          value: dbusers.find(user => user.id === userObj.id).email,
          writable: true,
          configurable: true,
          enumerable: true,
        })));
        res.send({ teams: sendteam, user: senduser });
      });
    });
  },

  getprojects(req, res) {
    const dbprojects = [];
    Project.find((err, e) => {
      e.forEach((f) => {
        dbprojects.push(f);
      })
      const sendproject = [];
      const userId = req.user.id;
      for (let i = 0; i < dbprojects.length; i += 1) {
        if (userId === dbprojects[i].superuser) {
          sendproject.push(dbprojects[i]);
        } else {
          for (let j = 0; j < dbprojects[i].normaluser.length; j += 1) {
            if (userId === dbprojects[i].normaluser[j]) {
              sendproject.push(dbprojects[i]);
            }
          }
          for (let j = 0; j < dbprojects[i].optionaluser.length; j += 1) {
            if (userId === dbprojects[i].optionaluser[j]) {
              sendproject.push(dbprojects[i]);
            }
          }
        }
      }
      res.send({ projects: sendproject });
    });
  },

  createnewproject(req, res, next) {
    const newproject = req.body;
    //console.log(newproject);
    Project.create(newproject)
      .then((project) => {
        res.send(project);
      })
      .catch(next);
    //projects.push(newproject);
    //res.send(`Create ${newproject.title} Successfully`);
  },

  updateproject(req, res, next) {
    const dbprojects = [];
    Project.find((err, e) => {
      e.forEach((f) => {
        dbprojects.push(f);
      })
      const request = req.body;
      const update = { ended: request.ended, deadline: request.deadline };
      const userId = req.user.id;
      for (let i = 0; i < dbprojects.length; i += 1) {
        if (dbprojects[i].id === request.projectId) {
          if (dbprojects[i].superuser === userId) {
            Project.findByIdAndUpdate({ _id: dbprojects[i]._id }, update)
              .then(() => Project.findById({ _id: dbprojects[i]._id }))
              .then(project => res.send(project))
              .catch(next);
            //res.send(`You have updated ${projects[i].title} successfully!!`);
          } else {
            res.send('You are not superuser, so you cannot update this project!');
          }
        }
      }
    });
  },

  getstats(req, res) {
    const dbprojects = [];
    Project.find((err, e) => {
      e.forEach((f) => {
        dbprojects.push(f);
      })
      const projectId = req.params.projectId;
      const userId = req.user.id;
      const stats = [];
      for (let i = 0; i < dbprojects.length; i += 1) {
        if (projectId === dbprojects[i].id) {
          if (userId !== dbprojects[i].superuser) {
            res.send('You are not superuser, so you cannot examine the vote!');
          } else {
            if (dbprojects[i].normaluser.length === 0) {
              const optarr = [];
              let center = [];
              let center2 = {};
              for (let j = 0; j < dbprojects[i].optionaluser.length; j += 1) {
                center = [];
                for (let k = 0; k < dbprojects[i].votes.length; k += 1) {
                  if (dbprojects[i].optionaluser[j] === dbprojects[i].votes[k].userid) {
                    for (let m = 0; m < dbprojects[i].votes[k].dates.length; m += 1) {
                      for (let n = 0; n < dbprojects[i].votes[k].dates[m].timeblocks.length; n += 1) {
                        center.push(
                          (tdtn(dbprojects[i].votes[k].dates[m].date) * 48) + dbprojects[i].votes[k].dates[m].timeblocks[n]
                        );
                      }
                    }
                    center2 = { name: dbprojects[i].optionaluser[j], vote: center };
                    optarr.push(center2);
                  }
                }
              }
              const basic = optarr[0].vote;
              const finalblocks = [];
              let count;
              for (let m = 0; m < basic.length; m += 1) {
                count = 0;
                for (let j = 0; j < optarr.length; j += 1) {
                  for (let k = 0; k < optarr[j].vote.length; k += 1) {
                    if (basic[m] === optarr[j].vote[k]) {
                      count += 1;
                    }
                  }
                }
                if (count === optarr.length) {
                  finalblocks.push(basic[m]);
                }
              }
              const contiblocks = conti(finalblocks, dbprojects[i].minDuration);
              const conobj = [];
              let copt;
              let coopt;
              for (let j = 0; j < contiblocks.length; j += 1) {
                coopt = [];
                for (let m = 0; m < optarr.length; m += 1) {
                  copt = 0;
                  for (let k = 0; k < dbprojects[i].minDuration; k += 1) {
                    for (let n = 0; n < optarr[m].vote.length; n += 1) {
                      if (contiblocks[j][k] === optarr[m].vote[n]) {
                        copt += 1;
                      }
                    }
                  }
                  if (copt == dbprojects[i].minDuration) {
                    coopt.push(optarr[m].name);
                  }
                }
                conobj.push({ contidays: contiblocks[j], optnum: coopt });
              }
              for (let j = 0; j < conobj.length; j += 1) {
                stats.push(tntd(conobj[j]));
              }
              res.send({ stats });
            } else {
              let c = 0;
              const nornotvote = [];
              const nordates = [];
              for (let j = 0; j < dbprojects[i].normaluser.length; j += 1) {
                for (let k = 0; k < dbprojects[i].votes.length; k += 1) {
                  if (dbprojects[i].normaluser[j] === dbprojects[i].votes[k].userid) {
                    nordates.push(dbprojects[i].votes[k].dates);
                  } else {
                    c += 1;
                  }
                }
                if (c === dbprojects[i].votes.length) {
                  nornotvote.push(dbprojects[i].normaluser[j]);
                }
              }
              if (nordates.length !== dbprojects[i].normaluser.length) {
                res.send({
                  warn: 'There are some normalusers have not voted',
                  normalusernovote: nornotvote,
                });
              } else {
                const blocksarr = [];
                let middle = [];
                for (let j = 0; j < nordates.length; j += 1) {
                  middle = [];
                  for (let k = 0; k < nordates[j].length; k += 1) {
                    for (let m = 0; m < nordates[j][k].timeblocks.length; m += 1) {
                      middle.push((tdtn(nordates[j][k].date) * 48) + nordates[j][k].timeblocks[m]);
                    }
                  }
                  blocksarr.push(middle);
                }
                const optarr = [];
                let center = [];
                let center2 = {};
                for (let j = 0; j < dbprojects[i].optionaluser.length; j += 1) {
                  center = [];
                  for (let k = 0; k < dbprojects[i].votes.length; k += 1) {
                    if (dbprojects[i].optionaluser[j] === dbprojects[i].votes[k].userid) {
                      for (let m = 0; m < dbprojects[i].votes[k].dates.length; m += 1) {
                        for (let n = 0; n < dbprojects[i].votes[k].dates[m].timeblocks.length; n += 1) {
                          center.push(
                            (tdtn(dbprojects[i].votes[k].dates[m].date) * 48) + dbprojects[i].votes[k].dates[m].timeblocks[n]
                          );
                        }
                      }
                      center2 = { name: dbprojects[i].optionaluser[j], vote: center };
                      optarr.push(center2);
                    }
                  }
                }
                const basic = blocksarr[0];
                const finalblocks = [];
                let count;
                for (let m = 0; m < basic.length; m += 1) {
                  count = 0;
                  for (let j = 0; j < blocksarr.length; j += 1) {
                    for (let k = 0; k < blocksarr[j].length; k += 1) {
                      if (basic[m] === blocksarr[j][k]) {
                        count += 1;
                      }
                    }
                  }
                  if (count === blocksarr.length) {
                    finalblocks.push(basic[m]);
                  }
                }
                const contiblocks = conti(finalblocks, dbprojects[i].minDuration);
                const conobj = [];
                let copt;
                let coopt;
                for (let j = 0; j < dbcontiblocks.length; j += 1) {
                  coopt = [];
                  for (let m = 0; m < optarr.length; m += 1) {
                    copt = 0;
                    for (let k = 0; k < dbprojects[i].minDuration; k += 1) {
                      for (let n = 0; n < optarr[m].vote.length; n += 1) {
                        if (contiblocks[j][k] === optarr[m].vote[n]) {
                          copt += 1;
                        }
                      }
                    }
                    if (copt == dbprojects[i].minDuration) {
                      coopt.push(optarr[m].name);
                    }
                  }
                  conobj.push({ contidays: contiblocks[j], optnum: coopt });
                }
                for (let j = 0; j < conobj.length; j += 1) {
                  stats.push(tntd(conobj[j]));
                }
                res.send({ stats });
              }
            }
          }
        }
      }
    });
  },

  uservote(req, res, next) {
    const dbprojects = [];
    Project.find((err, e) => {
      e.forEach((f) => {
        dbprojects.push(f);
      })
      const request = req.body;
      const userId = req.user.id;
      let b = 1;
      for (let i = 0; i < dbprojects.length; i += 1) {
        if (dbprojects[i].id === request.projectId) {
          for (let j = 0; j < dbprojects[i].votes.length; j += 1) {
            if (dbprojects[i].votes[j].userid === userId) {
              if (j) {
                dbprojects[i].votes[j].dates = request.dates;
                b = 0;
                Project.findByIdAndUpdate({ _id: dbprojects[i]._id }, { votes: dbprojects[i].votes })
                  .then(() => Project.findById({ _id: dbprojects[i]._id }))
                  .then(project => res.send(project))
                  .catch(next);
                //res.send('You have voted successfully!!');
              } else {
                res.send('You cannot change time, because you are superuser!!');
              }
            }
          }
          if (b) {
            dbprojects[i].votes.push({ userid: userId, dates: request.dates });
            Project.findByIdAndUpdate({ _id: dbprojects[i]._id }, { votes: dbprojects[i].votes })
              .then(() => Project.findById({ _id: dbprojects[i]._id }))
              .then(project => res.send(project))
              .catch(next);
            //res.send('You have voted successfully!!');
          }
        }
      }
    });
  },
  rmproject(req, res, next) {
    const dbprojects = [];
    Project.find((err, e) => {
      e.forEach((f) => {
        dbprojects.push(f);
      })
      const request = req.body;
      for (let i = 0; i < dbprojects.length; i += 1) {
        if (request.projectId === dbprojects[i].id) {
          Project.findByIdAndRemove({ _id: dbprojects[i]._id })
            .then(project => res.status(204).send(project))
            .catch(next);
          //res.send(`You have removed ${projects[i].title} successfully!!`);
        }
      }
    });
  },
  getproject(req, res) {
    const dbprojects = [];
    Project.find((err, e) => {
      e.forEach((f) => {
        dbprojects.push(f);
      })
      const projectId = req.params.projectId;
      for (let i = 0; i < dbprojects.length; i += 1) {
        if (projectId === dbprojects[i].id) {
          res.send(dbprojects[i]);
        }
      }
    });
  },
  getselectedteam(req, res) {
    const dbusers = [];
    User.find((err, c) => {
      c.forEach((d) => {
        dbusers.push(d);
      })
      const userId = req.user.id;
      let selectedteam;
      for (let i = 0; i < dbusers.length; i += 1) {
        if (userId === dbusers[i].id) {
          selectedteam = dbusers[i].selectedteam;
        }
      }
      res.send(selectedteam);
    });
  },
  postselectedteam(req, res, next) {
    const dbusers = [];
    User.find((err, c) => {
      c.forEach((d) => {
        dbusers.push(d);
      })
      const userId = req.user.id;
      const request = req.body;
      for (let i = 0; i < dbusers.length; i += 1) {
        if (userId === dbusers[i].id) {
          //dbusers[i].selectedteam = request;
          User.findByIdAndUpdate({ _id: dbusers[i]._id }, { selectedteam: request })
            .then(() => User.findById({ _id: dbusers[i]._id }))
            .then(user => res.send(user))
            .catch(next);
          //res.send('update selectedteam success');
          //console.log(users[i].selectedteam);
        }
      }
    });
  },
};
