import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/title.scss';

export default class Super extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updatepj = this.updatepj.bind(this);
    this.removepj = this.removepj.bind(this);
  }
  updatepj() {
    axios.post('/api/project/update', {
      projectId: this.props.projectId,
      ended: false,
	    deadline: 20170925,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.history.push('/');
  }
  removepj() {
    axios.post('/api/project/remove', {
      projectId: this.props.projectId,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={this.updatepj}>
          Update
        </button>
        <button onClick={this.removepj}>
          Remove
        </button>
      </div>
    );
  }
}
