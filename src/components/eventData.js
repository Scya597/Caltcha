import React, { Component } from 'react';

export default class EventData extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-border">
        <div>
          <h1 className="list-border">Title: 吃小龍蝦</h1>
          <h3>Location: 二餐</h3>
          <h3>Duration: 3小時</h3>
          <h3>Description: 大雨大雨一直下</h3>
        </div>
        <button className="btn btn-danger col-md-6">
          I do NOT feel like joining this event
        </button>
      </div>
    );
  }
}
