import React, { Component } from 'react';
import DatePicker from 'react-datetime';
import { Link } from 'react-router-dom';

export default class EventData extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-border">
        <div className="row">
          <Link className="btn btn-default col-md-4 back-button" to="/">
            ㄑ Back
          </Link>
          <div className="col-md-8">
            {'3 days left'}
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-xs-7 deadline">
              <span>deadline: 2017/08/28</span>
              <br />
              <span>starts from: 2107/09/11 17:30</span>
            </div>
            <div className="col-xs-3">
              <DatePicker value="new deadline" />
            </div>
          </div>
          <h1 className="list-border">Title: Fuck you</h1>
          <h3>Location: Friend zone</h3>
          <h3>Duration: 3 hours</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <iframe
          width="100%"
          height="500"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=新竹市交通大學&z=16&output=embed&t="
        >
        </iframe>
        <button className="btn btn-danger col-md-6">
          I do NOT feel like joining this event
        </button>
        <button className="btn btn-danger col-md-6">
          Delete this Event
        </button>
      </div>
    );
  }
}
