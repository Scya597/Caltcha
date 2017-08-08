import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';

export default class SuperData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { normaluser, optionaluser, closeduser } = this.props.voteData;
    const all = normaluser.vote.length + normaluser.nvote.length + optionaluser.vote.length + optionaluser.nvote.length;

    return(
      <div className="list-border col-md-6">
        <div>
          <div className="row list-border">
            <h2 className="centify">statistics</h2>
          </div>
          <div>
            <h3>All members in this TEAM: {all + closeduser.length}</h3>
            <h3>All members in this EVENT: {all}</h3>
            <h3>Normal Users (vote/not vote): {normaluser.vote.length}/{normaluser.nvote.length + normaluser.vote.length}</h3>
            <h3>Optional Users (vote/not vote): {optionaluser.vote.length}/{optionaluser.nvote.length + optionaluser.vote.length}</h3>
            <br />
            <h3>Closed Users: {closeduser.length}</h3>
            <div className="row">
              <img src="https://imagesvc.timeincapp.com/v3/fan/image?&c=sc&w=850&h=560&url=https://fansided.com/files/2017/04/22aa78c0e6be4d72f0e7c033c22e5a69c70328e560ef6eaaac54b36a8b008b18dd48a5027bd2c97cea8b20c156afccc9.jpg" className="size" />
            </div>
          </div>
          <Button bsStyle="primary" className="col-md-12">Submit</Button>
        </div>
      </div>
    );
  }
}
