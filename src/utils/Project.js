
/*
class Project {
constructor(Object project) {};
newOne();
vote(String userId, Array dates);
update(String userId, Number deadline);
remove(String userId);
getStats(String userId);
}
*/
import axios from 'axios';

class Project {
  constructor(project) {
    this.id = project.id;
    this.team = project.team;
    this.title = project.title;
    this.minDuration = project.minDuration;
    this.description = project.description;
    this.location = project.location;
    this.finaldate = project.finaldate;
    this.deadline = project.deadline;
    this.ended = project.ended;
    this.superuser = project.superuser;
    this.normaluser = project.normaluser;
    this.optionaluser = project.optionaluser;
    this.closedUser = project.closedUser;
    this.votes = project.votes;
  }
  newOne() {
    axios.post('/api/project/new', {
      id: this.id,
      team: this.team,
      title: this.title,
      minDuration: this.minDuration,
      description: this.description,
      location: this.location,
      finaldate: this.finaldate,
      deadline: this.deadline,
      ended: this.ended,
      superuser: this.superuser,
      normaluser: this.normaluser,
      optionaluser: this.optionaluser,
      closedUser: this.closedUser,
      votes: this.votes,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  vote(userId, dates) {
    axios.post(`/api/project/vote/${userId}`, {
      projectId: this.id,
      dates,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  update(userId, deadline) {
    axios.post(`/api/project/update/${userId}`, {
      projectId: this.id,
      ended: false,
      deadline,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  remove(userId) {
    axios.delete(`/api/project/remove/${userId}`, {
      projectId: this.id,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  getStats(userId) {
    axios.get(`/api/project/stats/${this.id}/${userId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export default Project;
