import React, { Component } from 'react';
import DatePicker from 'react-datetime';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Button, Glyphicon, Label } from 'react-bootstrap';

function finaldateFormat(finaldate) {
  if (typeof finaldate === 'undefined' || typeof finaldate.date === 'undefined') {
    return 'Not Chosen';
  } else {
    const formattedTime = (`00${finaldate.timeblocks[0] * 30}`).slice(-4);
    return `${finaldate.date} ${formattedTime}`;
  }
}

export default class EventData extends Component {
  constructor(props) {
    super(props);
  }

  deleteProject() {
    axios.post('/api/project/remove/', {
      projectId: this.props.project.id,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    window.location = '/';
  }

  render() {
    return (
      <div className="list-border col-md-6">
        <Col md={3}>
          <Link to="/">
            <h3><Button><Glyphicon glyph="chevron-left" />Back</Button></h3>
          </Link>
        </Col>
        <Col md={6}>
          {
            (this.props.hours >= 24) ?
            <h3><Label bsStyle="danger">{`${Math.round(this.props.hours/24)} days left`}</Label></h3> :
              (this.props.hours > 0) ?
              <h3><Label bsStyle="danger">{`${this.props.hours} hours left`}</Label></h3> :
              <h3><Label bsStyle="danger">Voting Ended</Label></h3>
          }
        </Col>
        <Col md={12}>
          <h1>{this.props.project.title}</h1>
        </Col>
        <Col md={3} />
        <Col md={6}>
          {
            (this.props.hours > 0) ?
            <h3><Label bsStyle="warning">{`Voting Deadline: ${this.props.project.deadline}`}</Label></h3> :
            <h3><Label bsStyle="warning">{`Event Starts From: ${finaldateFormat(this.props.project.finaldate)}`}</Label></h3>
          }
        </Col>
        <Col md={3}>
          {
            (this.props.project.superuser === this.props.userId) ?
            <h3><DatePicker dateFormat="YYYY / MM / DD" timeFormat={false} inputProps={{ placeholder: 'YYYY / MM / DD', required: true }} /></h3> :
            <h3 />
          }
        </Col>
        <Col md={12}>
          <h4 className="h4-left">Duration: {this.props.project.minDuration * 0.5} hours</h4>
        </Col>
        <Col md={12}>
          <p>{this.props.project.description}</p>
        </Col>
        <Col md={12}>
          <h4 className="h4-left">Location: {this.props.project.location}</h4>
        </Col>
        <iframe
          width="95%"
          height="350px"
          frameBorder="0px"
          scrolling="no"
          marginHeight="0px"
          marginWidth="0px"
          src={`http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${this.props.project.location}&z=16&output=embed&t=`}
        />
        <Col md={3}>
          {
            (this.props.project.superuser === this.props.userId) ?
              <Button bsStyle="danger" className="pull-xs-left" onClick={() => this.deleteProject()}>Delete this event</Button> :
              <Button bsStyle="danger" className="pull-xs-left">I don&rsquo;t feel like joining this event</Button>
          }
        </Col>
      </div>
    );
  }
}
