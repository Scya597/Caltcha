import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';
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
  }

  componentDidMount() {
    this.fetchuser();
  }
  fetchuser = () => {
    axios.get('/api/profile')
      .then((res) => {
        this.setState({
          user: res.data.user,
          teams: res.data.teams,
          newProject: {
            id: uuid(),
            finaldate: 0,
            ended: false,
            team: '',
            superuser: res.data.user.id,
            normaluser: ['5794283116'],
            optionaluser: ['nvifnvbnbrnobnorenobmey', 'asd'],
            votes: [
              {
                userid: res.data.user.id,
                dates: [
                  {
                    date: 20171007,
                    timeblocks: [2, 3, 6, 7, 8, 13, 14, 15],
                  },
                  {
                    date: 20170930,
                    timeblocks: [1, 2, 3, 8, 9, 10, 14, 15, 16],
                  },
                ],
              },
              {
                userid: '5794283116',
                dates: [
                  {
                    date: 20171007,
                    timeblocks: [2, 6, 7, 8, 13, 14, 15],
                  },
                ],
              },
              {
                userid: 'nvifnvbnbrnobnorenobmey',
                dates: [
                  {
                    date: 20170930,
                    timeblocks: [2, 6, 7, 8, 13, 14, 15],
                  },
                  {
                    date: 20171007,
                    timeblocks: [2, 3, 7, 8, 14, 15],
                  },
                ],
              },
            ],
          },
        });
      })
      .catch((err) => {
        console.log(err);
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
    console.log(this.state.newProject.team);
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
      return selectedTeamObj.members.map(item => <li key={item.id}>{item.username}</li>);
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
      <div className="all-proj-container">
        <h2>New Project</h2>
        <form onSubmit={this.saveNewProject}>
          <Col md={6}>
            <Col md={12}>
              <FormGroup>
                <h4>Event Name:</h4><FormControl type="text" onChange={event => this.syncData('title', event.target.value)} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <h4>Duration:</h4><FormControl type="number" min="1" onChange={event => this.syncData('minDuration', event.target.value)} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <h4>Location:</h4><FormControl type="text" onChange={event => this.syncData('location', event.target.value)} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <h4>Description:</h4><FormControl type="text" onChange={event => this.syncData('description', event.target.value)} />
              </FormGroup>
            </Col>
            <p>deadline</p><input type="number" onChange={event => this.syncData('deadline', event.target.value)} />
          </Col>
          <Col md={6}>
            <p>Team</p>
            <select onChange={event => this.syncData('team', event.target.value)}>
              <option value="" key="0" />
              {this.renderTeamList()}
            </select>
            <ul>
              {this.renderMemberList()}
            </ul>
            <Col md={6}>
              <Link to="/"><Button>Cancel</Button></Link>
            </Col>
            <Col md={6}>
              <Button bsStyle="danger" type="submit">OK</Button>
            </Col>
          </Col>
        </form>
      </div>
    );
  }
}
export default New;
