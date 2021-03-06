import React, { Component } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';
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
      superselectedpjs: [],
      otherselectedpjs: [],
      selectedTeam: { id: '', name: '' },
    };
    this.fetchuser = this.fetchuser.bind(this);
    this.fetchprojects = this.fetchprojects.bind(this);
    this.setinitteam = this.setinitteam.bind(this);
    this.setSelectedTeam = this.setSelectedTeam.bind(this);
  }
  componentDidMount() {
    this.fetchuser();
    // this.fetchprojects();
    // this.setinitteam();
  }
  setSelectedTeam(teamObj) {
    axios.post('/api/team/select', teamObj)
      .then((res) => {
        console.log('(main_page.js)[POST /api/team/select]');
        const selectedpjs = [];
        for (let i = 0; i < this.state.projects.length; i += 1) {
          if (this.state.projects[i].team === teamObj.id) {
            selectedpjs.push(this.state.projects[i]);
          }
        }
        const superselectedpjs = [];
        const otherselectedpjs = [];
        for (let i = 0; i < selectedpjs.length; i += 1) {
          if (this.state.user.id === selectedpjs[i].superuser) {
            superselectedpjs.push(selectedpjs[i]);
          } else {
            otherselectedpjs.push(selectedpjs[i]);
          }
        }
        this.setState({ selectedTeam: teamObj, superselectedpjs, otherselectedpjs });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  setinitteam = () => {
    axios.get('/api/team/select')
      .then((res) => {
        const selectedteam = res.data;
        if (selectedteam.id === '') {
          axios.get('/api/profile')
            .then((resp) => {
              const team = resp.data.teams[0];
              this.setSelectedTeam({ id: team.id, name: team.name });
            })
            .catch((erro) => {
              console.log(erro);
            });
        } else {
          this.setSelectedTeam(selectedteam);
        }
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
    this.setinitteam();
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.fetchprojects();
  }
  render() {
    return (
      <div className="text-center">
        <Navbar
          user={this.state.user}
          teams={this.state.teams}
          selectedTeam={this.state.selectedTeam}
          setSelectedTeam={this.setSelectedTeam}
        />
        <Col md={4} className="manage-background">
          <ManageList
            superProj={this.state.superselectedpjs}
            user={this.state.user}
          />
        </Col>
        <Col md={8}>
          <VoteList
            teams={this.state.teams}
            unvotedProj={this.state.otherselectedpjs.filter(proj => typeof proj.votes.find(vote => vote.userid === this.state.user.id) === 'undefined')}
            votedProj={this.state.otherselectedpjs.filter(proj => typeof proj.votes.find(vote => vote.userid === this.state.user.id) !== 'undefined')}
            user={this.state.user}
          />
        </Col>
      </div>

    );
  }
}
export default MainPage;
