// caltcha-timeblocks-picker
// Dependencies: react-bootstrap
// Props:
// [Input]
// minDuration,
// hasNext: has next day,
// nextOffset,
// selectedBlocks: Array,
// [Output]
// handleBlockClick: Function,

import React, { Component } from 'react';
import { Col, ButtonGroup, Button } from 'react-bootstrap';
import '../scss/caltcha-timeblocks-picker.scss';

class timeblocksPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPointer: 0,
    };
  }

  setPointer(blockId) {
    this.setState({ currentPointer: blockId });
  }

  renderBlocks() {
    console.log(this.props.selectedBlocks);
    const blocksJSX = [];
    for (let i = 1; i <= 48; i += 1) {
      if (typeof this.props.selectedBlocks === 'undefined' || typeof this.props.selectedBlocks.find(block => block === i) === 'undefined') {
        blocksJSX.push(<Button className={Math.abs(this.state.currentPointer - i) <= 1 ? '' : 'timeblock-empty'} bsSize="small" bsStyle="default" key={i} onMouseEnter={() => this.setPointer(i)} onMouseLeave={() => this.setPointer(0)}>{Math.abs(this.state.currentPointer - i) <= 1 ? i : <div className="timeblock-empty" />}</Button>);
      } else {
        blocksJSX.push(<Button className={Math.abs(this.state.currentPointer - i) <= 1 ? '' : 'timeblock-empty'} bsSize="small" bsStyle="primary" key={i} onMouseEnter={() => this.setPointer(i)} onMouseLeave={() => this.setPointer(0)}>{Math.abs(this.state.currentPointer - i) <= 1 ? i : <div className="timeblock-empty" />}</Button>);
      }
    }
    return blocksJSX;
  }

  render() {
    return (
      <div>
        <Col md={12}>
          <ButtonGroup>
            {this.renderBlocks()}
          </ButtonGroup>
        </Col>
      </div>
    );
  }
}

export default timeblocksPicker;
