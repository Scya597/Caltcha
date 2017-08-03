import React, { Component } from 'react';
import axios from 'axios';

import User from '../utils/User';

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {} };

    axios.get('/api/profile/userid').then((res) => {
      console.log(res);
      const raw = res.data.user;
      const user = new User(raw);
      this.setState({ user: user });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        {this.state.user.username}
      </div>
    );
  }
}
