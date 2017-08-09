import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup, Panel } from 'react-bootstrap';

const deadline = require('../utils/functions/deadline');

function finaldateFormat(finaldate) {
  if (typeof finaldate === 'undefined' || typeof finaldate.date === 'undefined') {
    return 'Final Date not announced.';
  } else {
    const hrs = finaldate.timeblocks[0] * 0.5;
    let formattedTime = '';
    if (Math.round(hrs) > hrs) {
      formattedTime = `${Math.round(hrs) - 1}:30`;
    } else {
      formattedTime = `${Math.round(hrs)}:00`;
    }
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
                  <h7>日期選擇期限：</h7>
                </div>
                <h7 className="vote-owner">
                  {
                    `${(proj.deadline).toString().substring(0, 4)}年`
                      + `${(proj.deadline).toString().substring(4, 6)}月`
                      + `${(proj.deadline).toString().substring(6, 8)}日`
                  }
                </h7>
                <div>
                  {
                    (deadline(proj.deadline) >= 24) ?
                      <div className="vote-count">
                        <h7>{`決定時間剩下 ${Math.round(deadline(proj.deadline) / 24)} 天`}</h7>
                      </div>
                    :
                      (deadline(proj.deadline) > 0) ?
                        <div className="vote-count">
                          <h7>{`決定時間剩下 ${deadline(proj.deadline)} 小時`}</h7>
                        </div>
                      :
                        <div className="vote-count-ended">
                          <h7>
                            {
                              `已於${(proj.deadline).toString().substring(4, 6)}月`
                                + `${(proj.deadline).toString().substring(6, 8)}日結束`
                            }
                          </h7>
                        </div>
                  }
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
        <div className="row list-border vote-background">
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
