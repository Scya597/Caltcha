import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/title.scss';

export default class Super extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchproject = this.fetchproject.bind(this);
    this.updatepj = this.updatepj.bind(this);
    this.removepj = this.removepj.bind(this);
    this.back = this.back.bind(this);
  }
  componentDidMount() {
    this.fetchproject();
  }
  fetchproject() {
    const { pjid } = this.props.match.params;
    axios.get(`/api/project/${pjid}`)
      .then((res) => {
        this.setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    this.fetchproject();
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
  back() {
    this.props.history.push('/');
  }
  renderinfo = (obj) => {
    if (obj.ended === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>title: {obj.title}</h1>
        <h2>description: {obj.description}</h2>
        <h2>location: {obj.location}</h2>
        <h2>deadline: {obj.deadline}</h2>
        <h2>ended: {obj.ended.toString()}</h2>
      </div>
    );
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
        <button onClick={this.back}>
          Back to index
        </button>
        {this.renderinfo(this.state)}
      </div>
    );
  }
}
