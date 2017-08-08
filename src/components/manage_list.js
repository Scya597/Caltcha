import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel, ProgressBar, Label } from 'react-bootstrap';

const deadline = require('../utils/functions/deadline');
const ifvote = require('../utils/functions/ifvote');

class manageList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  rendervote = (proj) => {
    if (proj.normaluser.length === 0) {
      return (
        <ProgressBar
          now={Math.round((ifvote(proj).optionaluser.vote.length/proj.optionaluser.length) * 100)}
          label={`${Math.round((ifvote(proj).optionaluser.vote.length/proj.optionaluser.length) * 100)}%`}
          bsStyle="success"
        />
      );
    } else {
      return (
        <div className="row">
          <ProgressBar
            now={Math.round((ifvote(proj).normaluser.vote.length/proj.normaluser.length) * 100)}
            label={`${Math.round((ifvote(proj).normaluser.vote.length/proj.normaluser.length) * 100)}%`}
            bsStyle="danger"
          />
        </div>
      );
    }
  }

  render() {
    const superProjJSX = this.props.superProj.map((proj) => {
      return (
        <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`} key={proj.id}>
          <Panel bsStyle="primary" className="btn-shadow">
            <h1 className="pj-title">{proj.title}</h1>
            <div className="manage-list">
              <h4>預計時長：
                {
                  proj.minDuration <= 16 ?
                    (proj.minDuration * 0.5) + '小時'
                  :
                    '1天'
                }
              </h4>
              <h4>地點： {proj.location}</h4>
              {this.rendervote(proj)}
            </div>
            <div className="danger">
              <h5>票選結束日期： {proj.deadline}</h5>
            </div>
            <div className="danger">
              <h5>
                {
                  (deadline(proj.deadline) >= 24) ?
                    <h5>{`${Math.round(deadline(proj.deadline) / 24)} days left`}</h5>
                  :
                    (deadline(proj.deadline) > 0) ?
                      <h5>{`${deadline(proj.deadline)} hours left`}</h5>
                    :
                      <h3>Voting Ended</h3>
                }
              </h5>
            </div>
          </Panel>
        </Link>
      );
    });
    return (
      <div>
        <h3>我管理的活動</h3>
        <Link to="/new"><Button bsStyle="primary" bsSize="large" className="btn-shadow" block>新增活動</Button></Link>
        <div className="manage-list-container list-border">
          {superProjJSX}
        </div>
      </div>
    );
  }
}

export default manageList;
