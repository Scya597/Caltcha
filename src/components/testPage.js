import React, { Component } from 'react';
import axios from 'axios';

import User from '../utils/User';
import Project from '../utils/Project';

const userId = 'userid';

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {}, projects: [] };
  }

  componentDidMount() {
    axios.get(`/api/profile/${userId}`).then((res) => {
      const user = new User(res.data.user);
      this.setState({ user: user });
    }).catch((err) => {
      console.log(err);
    });

    axios.get(`/api/project/data/${userId}`).then((res) => {
      const projects = res.data.projects.map(project => new Project(project));
      this.setState({ projects: projects });
    }).catch((err) => {
      console.log(err);
    });
  }

  renderPj() {
    if (this.state.projects.length === 0) return <p>Oh Shit!</p>;
    else return this.state.projects.map(item => <p key={item.id}>{item.title}</p>);
  }

  render() {
    return (
      <div>
        <p>User: {this.state.user.username}</p>
        {this.renderPj()}
      </div>
    );
  }
}
