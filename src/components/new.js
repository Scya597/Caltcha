import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datetime';
import moment from 'moment';
// import _ from 'lodash';
import '../scss/title.scss';
import '../scss/react-datetime.scss';

function getData() {
  return [axios.get('/api/profile'), axios.get('/api/team/select')];
}

function renderDuration() {
  const hourArr = [];
  for (let i = 1; i < 16; i += 1) hourArr.push(<option value={i} key={i}>{i * 0.5} hrs</option>);
  hourArr.push(<option value={48} key={48}>1 day</option>);
  return hourArr;
}

const defaultVotes = [
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
];

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      teams: [],
      newProject: {},
      selectedTeam: {},
    };
    this.saveNewProject = this.saveNewProject.bind(this);
    this.syncData = this.syncData.bind(this);
    this.fetchuser = this.fetchuser.bind(this);
  }

  componentDidMount() {
    this.fetchuser();
  }
  fetchuser = () => {
    axios.all(getData())
      .then((res) => {
        this.setState({
          user: res[0].data.user,
          teams: res[0].data.teams,
          newProject: {
            id: uuid(),
            finaldate: 0,
            ended: false,
            team: res[1].data.id,
            superuser: res[0].data.user.id,
            normaluser: ['5794283116'],
            optionaluser: ['nvifnvbnbrnobnorenobmey', 'asd'],
            votes: [
              {
                userid: res[0].data.user.id,
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
            ].concat(defaultVotes),
          },
          selectedTeam: res[1].data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveNewProject() {
    axios.get('/api/profile')
      .then((res) => {
        const teamid = this.state.newProject.team;
        const teams = res.data.teams;
        let teamname;
        for (let i = 0; i < teams.length; i += 1) {
          if (teams[i].id === teamid) {
            teamname = teams[i].name;
          }
        }
        axios.post('/api/team/select', { id: teamid, name: teamname })
          .then((resp) => {
            console.log(resp);
          })
          .catch((erro) => {
            console.log(erro);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
      return selectedTeamObj.members.map(item => <li key={item.id}>{item.username}</li>);
    }
  }

  render() {
    return (
      <div className="new-proj-container">
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
                <h4>Duration:</h4>
                <FormControl componentClass="select" type="number" min="1" onChange={event => this.syncData('minDuration', event.target.value)}>
                  {renderDuration()}
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <h4>Location:</h4><FormControl type="text" onChange={event => this.syncData('location', event.target.value)} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <h4>Description:</h4>
                <FormControl componentClass="textarea" type="text" onChange={event => this.syncData('description', event.target.value)} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <h4>Voting Deadline:</h4>
              <DatePicker dateFormat="YYYY / MM / DD" timeFormat={false} onChange={data => this.syncData('deadline', moment(data).format('YYYYMMDD'))} />
            </Col>
          </Col>
          <Col md={6}>
            <h4>Team: {this.state.selectedTeam.name}</h4>
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
