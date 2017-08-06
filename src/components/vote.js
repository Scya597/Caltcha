import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Super from './super';
import '../scss/title.scss';

export default class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = { userid: '', pjid: '', superid: '' };
    this.fetchuserandpj = this.fetchuserandpj.bind(this);
    this.vote = this.vote.bind(this);
  }
  componentDidMount() {
    this.fetchuserandpj();
  }
  fetchuserandpj() {
    const { userid } = this.props.match.params;
    const { pjid } = this.props.match.params;
    const { superid } = this.props.match.params;
    this.setState({ userid, pjid, superid });
  }
  vote() {
    const tmpDates = [
      {
        date: 20170728,
        timeblocks: [1, 2, 3],
      },
      {
        date: 20170811,
        timeblocks: [6, 7, 8],
      },
    ];
    axios.post('/api/project/vote/', {
      projectId: this.state.pjid,
      dates: tmpDates,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push('/');
  }
  ifsuper (fuck) {
    if (fuck.userid !== fuck.superid) {
      return (
        <div>
          <img src="http://www.motherjones.com/wp-content/uploads/silicon-valley.jpg" />
          <h1>vote</h1>
          <button onClick={this.vote}>VOTE</button>
          <Link to="/">Back to Main Page</Link>
        </div>
      );
    } else {
      return (
        <Super projectId={fuck.pjid} history={this.props.history} match={this.props.match} />
      );
    }
  }

  render() {
    return (
      <div>
        {this.ifsuper(this.state)}
      </div>
    );
  }
}
