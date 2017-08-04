import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
// import _ from 'lodash';
import '../scss/title.scss';


class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      teams: [],
      newProject: {},
    };
    this.saveNewProject = this.saveNewProject.bind(this);
    this.syncData = this.syncData.bind(this);
    this.fetchuser = this.fetchuser.bind(this);
    this.initNewProj = this.initNewProj.bind(this);
  }

  componentDidMount() {
    this.fetchuser();
    this.initNewProj();
  }
  fetchuser = () => {
    axios.get('/api/profile')
      .then((res) => {
        this.setState({
          user: res.data.user,
          teams: res.data.teams,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  initNewProj = () => {
    console.log(this.state.user.id);
    this.setState({
      newProject: {
        id: uuid(),
        finaldate: 0,
        ended: false,
        team: '',
        superuser: this.state.user.id,
        normaluser: [],
        optionaluser: [],
      },
    });
  }

  saveNewProject() {
    axios.post('/api/project/new', this.state.newProject)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
    this.props.history.push('/');
  }

  syncData(field, data) {
    const proj = this.state.newProject;
    Object.defineProperty(proj, field, {
      value: data,
      writable: true,
      configurable: true,
      enumerable: true,
    });
    this.setState({
      newProject: proj,
    });
  }

  renderMemberList() {
    if (typeof this.state.newProject.team === 'undefined' || this.state.newProject.team === '') {
      return <option>Select a team first!</option>;
    } else {
      const selectedTeamObj =  this.state.teams.find(team => team.id === this.state.newProject.team);
      return selectedTeamObj.members.map(item => <li key={item}>{item}</li>);
    }
  }

  renderTeamList() {
    if (typeof this.state.user.team === 'undefined' || this.state.user.team.length === 0) {
      return <option>You are a single dog!</option>;
    } else {
      return this.state.user.team.map(item => <option value={item} key={item}>{this.state.teams.find(team => team.id === item).name}</option>);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.saveNewProject}>
          <h2>New Project</h2>
          <p>Title</p><input type="text" onChange={event => this.syncData('title', event.target.value)} />
          <p>Description</p><textarea onChange={event => this.syncData('description', event.target.value)} />
          <p>minDuration</p><input type="number" name="minDuration" min="1" onChange={event => this.syncData('minDuration', event.target.value)} />
          <p>deadline</p><input type="number" onChange={event => this.syncData('deadline', event.target.value)} />
          <p>location</p><input type="text" onChange={event => this.syncData('location', event.target.value)} />
          <p>Team</p>
          <select onChange={event => this.syncData('team', event.target.value)}>
            <option value="" key="0" />
            {this.renderTeamList()}
          </select>
          <ul>
            {this.renderMemberList()}
          </ul>
          <button type="submit">OK</button>
        </form>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
export default New;
