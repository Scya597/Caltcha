import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup, Panel } from 'react-bootstrap';

const deadline = require('../utils/functions/deadline');

function finaldateFormat(finaldate) {
  if (typeof finaldate.date === 'undefined') {
    return 'Final Date not announced.';
  } else {
    const formattedTime = (`00${finaldate.timeblocks[0] * 30}`).slice(-4);
    return `${finaldate.date} ${formattedTime}`;
  }
}

class voteList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.props.unvotedProj);
    const unvotedProjJSX = this.props.unvotedProj.map((proj) => {
      return (
        <div className="col-md-3" key={proj.id}>
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <Panel bsStyle="danger" header={proj.title} className="btn-shadow vote-title">
              <div>
                <div className="danger">
                  <h7>
                    {
                      (deadline(proj.deadline) >= 24) ?
                        <h7>{`剩下 ${Math.round(deadline(proj.deadline) / 24)} 天`}</h7>
                      :
                        (deadline(proj.deadline) > 0) ?
                          <h7>{`剩下 ${deadline(proj.deadline)} 小時`}</h7>
                        :
                          <h7>Voting Ended</h7>
                    }
                  </h7>
                </div>
                <div className="vote-list">
                  <h7 className="vote-left">預計時長：
                    {
                      proj.minDuration <= 16 ?
                        (proj.minDuration * 0.5) + '小時'
                      :
                        '1天'
                    }
                  </h7>
                  <br />
                  <h7>地點：{proj.location}</h7>
                  <h5 className="vote-owner">發起人：{this.props.teams.find(team => team.id === proj.team).members.find(member => member.id === proj.superuser).username}</h5>
                  <br />
                </div>
                <div className="centify">
                  <h7>日期選擇期限：</h7>
                  <br />
                  <h7>
                    {
                      `${(proj.deadline).toString().substring(0, 4)}年`
                        + `${(proj.deadline).toString().substring(4, 6)}月`
                        + `${(proj.deadline).toString().substring(6, 8)}日`
                    }
                  </h7>
                </div>
              </div>
            </Panel>
          </Link>
        </div>
      );
    });
    const votedProjJSX = this.props.votedProj.map((proj) => {
      return (
        <ListGroupItem key={proj.id} >
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h5>{finaldateFormat(proj.finaldate)} <strong>{proj.title},</strong> Location: {proj.location}, Duration：{proj.minDuration * 0.5} hrs</h5>
          </Link>
        </ListGroupItem>
      );
    });

    return (
      <div>
        <h3>我要選擇日期的活動</h3>
        <div className="row list-border">
          {unvotedProjJSX}
        </div>
        <h3>日期已選擇的活動</h3>
        <ListGroup>
          {votedProjJSX}
        </ListGroup>
      </div>
    );
  }
}

export default voteList;
