import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../scss/title.scss';
import User from '../utils/User';
import Project from '../utils/Project';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, projects: [] };
    this.fetchuser = this.fetchuser.bind(this);
    this.fetchprojects = this.fetchprojects.bind(this);
  }
  componentDidMount() {
    this.fetchuser();
    this.fetchprojects();
  }
  fetchuser = () => {
    axios.get('/api/profile')
      .then((res) => {
        if (!res.data.user) {
          window.location = '/login';
        }
        const user = new User(res.data.user);
        this.setState({ user });
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
    return (
      arr.map(this.rendertitle)
    );
  }
  rendertitle = (obj) => {
    return (
      <li key={obj.id}>
        <Link to={`/vote/${obj.id}`}>
          {obj.title}
        </Link>
      </li>
    );
  }
  render() {
    return (
      <div>
        <h1>Caltcha</h1>
        <h3>{this.state.user.username}     <a href="/logout">LOGOUT</a></h3>
        <ul>{this.renderpjs(this.state.projects)}</ul>
        <Link to="/new">Start a Project</Link>
      </div>

    );
  }
}
export default MainPage;