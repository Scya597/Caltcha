import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from '../utils/User';
import Project from '../utils/Project';
import Navbar from './navbar';
import ManageList from './manage_list';
import VoteList from './vote_list';
import '../scss/title.scss';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      teams: [],
      projects: [],
      selectedTeam: {},
    };
    this.fetchuser = this.fetchuser.bind(this);
    this.fetchprojects = this.fetchprojects.bind(this);
    this.setSelectedTeam = this.setSelectedTeam.bind(this);
    this.super = this.super.bind(this);
    this.voted = this.voted.bind(this);
    this.novoted = this.novoted.bind(this);
  }
  componentDidMount() {
    this.fetchuser();
    this.fetchprojects();
  }
  setSelectedTeam(teamObj) {
    this.setState({ selectedTeam: teamObj });
  }
  fetchuser = () => {
    axios.get('/api/profile')
      .then((res) => {
        if (!res.data.user) {
          window.location = '/login';
        }
        const user = new User(res.data.user);
        this.setState({
          user,
          teams: res.data.teams,
          selectedTeam: { id: res.data.teams[0].id, name: res.data.teams[0].name }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  fetchprojects = () => {
    axios.get('/api/project/data')
      .then((res) => {
        const projects = res.data.projects.map(project => new Project(project));
        this.setState({ projects });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  renderpjs = (arr) => {
    const superarr = this.super(arr);
    const votedarr = this.voted(arr);
    const novotedarr = this.novoted(arr);
    return (
      <div>
        {this.rendersuper(superarr)}
        {this.rendervoted(votedarr)}
        {this.rendernovoted(novotedarr)}
      </div>
    );
  }
  rendersuper = (superarr) => {
    if (superarr.length !== 0) {
      return (
        <div>
          <h4>Your project</h4>
          <ul>{superarr.map(this.rendertitle)}</ul>
        </div>
      );
    }
  }
  rendervoted = (votedarr) => {
    if (votedarr.length !== 0) {
      return (
        <div>
          <h4>You have voted</h4>
          <ul>{votedarr.map(this.rendertitle)}</ul>
        </div>
      );
    }
  }
  rendernovoted = (novotedarr) => {
    if (novotedarr.length !== 0) {
      return (
        <div>
          <h4>Your have not voted</h4>
          <ul>{novotedarr.map(this.rendertitle)}</ul>
        </div>
      );
    }
  }
  rendertitle = (obj) => {
    return (
      <li key={obj.id}>
        <Link to={`/vote/${obj.id}/${this.state.user.id}/${obj.superuser}`}>
          {obj.title}
        </Link>
      </li>
    );
  }
  super = (arr) => {
    const superarr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (this.state.user.id === arr[i].superuser) {
        superarr.push(arr[i]);
      }
    }
    return superarr;
  }
  voted = (arr) => {
    const votedarr = [];
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].votes.length; j += 1) {
        if (this.state.user.id === arr[i].votes[j].userid && this.state.user.id !== arr[i].superuser) {
          votedarr.push(arr[i]);
        }
      }
    }
    return votedarr;
  }
  novoted = (arr) => {
    const novotedarr = [];
    let b;
    for (let i = 0; i < arr.length; i += 1) {
      b = 1;
      for (let j = 0; j < arr[i].votes.length; j += 1) {
        if (this.state.user.id === arr[i].votes[j].userid) {
          b = 0;
        }
      }
      if (b) {
        novotedarr.push(arr[i]);
      }
    }
    return novotedarr;
  }

  render() {
    return (
      <div>
        <Navbar
          user={this.state.user}
          teams={this.state.teams}
          selectedTeam={this.state.selectedTeam}
          setSelectedTeam={this.setSelectedTeam}
        />
        <div className="row text-center">
          <div className="col-md-4">
            <ManageList
              superProj={this.state.projects.filter(proj => proj.team === this.state.selectedTeam.id).filter(proj => proj.superuser === this.state.user.id)}
              user={this.state.user}
            />
          </div>
          <div className="col-md-8">
            <VoteList
              unvotedProj={this.state.projects.filter(proj => proj.team === this.state.selectedTeam.id).filter(proj => proj.superuser !== this.state.user.id)}
              votedProj={this.state.projects.filter(proj => proj.team === this.state.selectedTeam.id).filter(proj => proj.superuser !== this.state.user.id)}
              user={this.state.user}
            />
          </div>
        </div>
      </div>

    );
  }
}
export default MainPage;
