import Post from '../models/Post';

const test = require('../../../test.json');

const teams = [test.team];
const users = [test.user];
const projects = [test.project];

module.exports = {

  getteamanduser(req, res) {
    let sendteam = [];
    let senduser;
    const userId = req.params.userId;
    console.log(userId);
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].members.length; j++) {
        if (userId === teams[i].members[j]) {
          sendteam.push(teams[i]);
        }
      }
    }
    for (let i = 0; i < users.length; i++) {
      if (userId === users[i].id) {
        senduser = users[i];
        console.log(senduser);
        console.log(sendteam);
      }
    }
    console.log(senduser);
    res.send({ teams: sendteam, user: senduser });
  },

  getprojects(req, res) {
    let sendproject = [];
    const userId = req.params.userId;
    for (let i = 0; i < projects.length; i++) {
      if (userId === projects[i].superuser) {
        sendproject.push(projects[i]);
      } else {
        for (let j = 0; j < projects[i].normaluser.length; j++) {
          if (userId === projects[i].normaluser[j]) {
            sendproject.push(projects[i]);
          }
        }
        for (let j = 0; j < projects[i].optionaluser.length; j++) {
          if (userId === projects[i].optionaluser[j]) {
            sendproject.push(projects[i]);
          }
        }
      }
    }
    res.send({ projects: sendproject });
  },

  createnewproject(req, res) {
    const newproject = req.body;
    projects.push(newproject);
    res.send(`Create ${newproject.title} Successfully`);
  },

  updateproject(req, res) {
    const request = req.body;
    const userId = req.params.userId;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === request.projectId) {
        if (projects[i].superuser === userId) {
          projects[i].ended = request.ended;
          projects[i].deadline = request.deadline;
          res.send(`You have updated ${projects[i].title} successfully!!`);
        } else {
          //res.send('You are not superuser, so you cannot update this project!');
        }
      }
    }
  },

  getstats(req, res) {

  },

  uservote(req, res) {
    const request = req.body;
    const userId = req.params.userId;
    let b = 1;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === request.projectId) {
        for (let j = 0; j < projects[i].votes.length; j++) {
          if (projects[i].votes[j].userid === userId) {
            projects[i].votes[j].dates = request.dates;
            b = 0;
            res.send('You have voted successfully!!')
          }
        }
        if (b) {
          projects[i].votes.push({ userid: userId, dates: request.dates });
          res.send('You have voted successfully!!')
        }
      }
    }
  },
  rmproject(req, res) {
    const request = req.body;
    const userId = req.params.userId;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === request.projectId) {
        if (projects[i].superuser === userId) {
          projects.splice(i, 1);
          res.send(`You have removed ${projects[i].title} successfully!!`);
        } else {
          //res.send('You are not superuser, so you cannot delete this project!');
        }
      }
    }
  }
};
