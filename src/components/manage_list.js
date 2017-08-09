import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel, ProgressBar } from 'react-bootstrap';

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
        <div>
          <div className="row centify">
            投票比例(成員非必須參加)
          </div>
          <div className="row">
            <ProgressBar
              now={Math.round((ifvote(proj).optionaluser.vote.length / proj.optionaluser.length) * 100)}
              label={`${Math.round((ifvote(proj).optionaluser.vote.length / proj.optionaluser.length) * 100)}%`}
              bsStyle="success"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row centify">
            投票比例(必要參與成員)
          </div>
          <div className="row">
            <ProgressBar
              now={Math.round((ifvote(proj).normaluser.vote.length / proj.normaluser.length) * 100)}
              label={`${Math.round((ifvote(proj).normaluser.vote.length / proj.normaluser.length) * 100)}%`}
              bsStyle="danger"
            />
          </div>
        </div>
      );
    }
  }

  render() {
    const superProjJSX = this.props.superProj.map((proj) => {
      return (
        <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`} key={proj.id}>
          <Panel bsStyle="primary" className="btn-shadow manage-panel">
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
            <div>
              <h5>
                {
                  `日期選擇期限：${(proj.deadline).toString().substring(0, 4)}年`
                    + `${(proj.deadline).toString().substring(4, 6)}月`
                    + `${(proj.deadline).toString().substring(6, 8)}日`
                }
              </h5>
            </div>
            <div>
              {
                (deadline(proj.deadline) >= 24) ?
                  <div className="danger">
                    <h5>{`剩下 ${Math.round(deadline(proj.deadline) / 24)} 天`}</h5>
                  </div>
                :
                  (deadline(proj.deadline) > 0) ?
                    <div className="danger">
                      <h5>{`剩下 ${deadline(proj.deadline)} 小時`}</h5>
                    </div>
                  :
                    <div className="danger-end">
                      <h5>
                        {
                          `已於${(proj.deadline).toString().substring(4, 6)}月`
                            + `${(proj.deadline).toString().substring(6, 8)}日結束`
                        }
                      </h5>
                    </div>
              }
            </div>
          </Panel>
        </Link>
      );
    });
    return (
      <div>
        <h3 className="label-white">我管理的活動</h3>
        <Link to="/new"><Button bsStyle="success" bsSize="large" className="btn-shadow" block>新增活動</Button></Link>
        <div className="manage-list-container">
          {superProjJSX}
        </div>
      </div>
    );
  }
}

export default manageList;
