// caltcha-timeblocks-picker
// Dependencies: react-bootstrap
// Props:
// [Input]
// minDuration,
// allowOnly: Array,
// hasNext: has next day,
// nextOffset,
// selectedBlocks: Array,
// [Output]
// onBlockClick: return selected Array, need a function to process,

import React, { Component } from 'react';
import { Col, ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../scss/caltcha-timeblocks-picker.scss';

function block2Time(blockNum) {
  if (typeof blockNum === 'undefined') {
    return 'Block not defined.';
  } else {
    const hrs = blockNum * 0.5;
    let formattedTime = '';
    if (Math.round(hrs) > hrs) {
      formattedTime = `${Math.round(hrs) - 1}:30 ~ ${Math.round(hrs)}:00`;
    } else {
      formattedTime = `${Math.round(hrs)}:00 ~ ${Math.round(hrs)}:30`;
    }
    return formattedTime;
  }
}

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

  toggleBlock(blockId) {
    const selectedBlocks = this.props.selectedBlocks;
    const blockIdIndex = selectedBlocks.findIndex(id => blockId === id);
    if (blockIdIndex !== -1) {
      selectedBlocks.splice(blockIdIndex, 1)
      this.props.onBlockClick(selectedBlocks);
    } else {
      selectedBlocks.push(blockId)
      this.props.onBlockClick(selectedBlocks);
    }
  }

  renderBlocks() {
    const blocksJSX = [];
    for (let i = 1; i <= 48; i += 1) {
      if ((typeof this.props.selectedBlocks === 'undefined') || (typeof this.props.selectedBlocks.find(block => block === i) === 'undefined')) {
        const time = block2Time(i);
        blocksJSX.push(
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-def">{time}</Tooltip>}
            key={i}
            onEnter={() => this.setPointer(i)}
            onExit={() => this.setPointer(0)}
          >
            <Button
              className={(this.state.currentPointer === i) ? 'timeblock-expand' : 'timeblock-empty'}
              bsSize="small"
              bsStyle="default"
              key={i}
              onClick={() => this.toggleBlock(i)}
            >
              {(this.state.currentPointer === i) ? <div className="timeblock-expand" /> : <div className="timeblock-empty" />}
            </Button>
          </OverlayTrigger>);
      } else {
        const time = block2Time(i);
        blocksJSX.push(
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-pri">{time}</Tooltip>}
            key={i}
            onEnter={() => this.setPointer(i)}
            onExit={() => this.setPointer(0)}
          >
            <Button
              className={(this.state.currentPointer === i) ? 'timeblock-expand' : 'timeblock-empty'}
              bsSize="small"
              bsStyle="primary"
              key={i}
              onClick={() => this.toggleBlock(i)}
            >
              {(this.state.currentPointer === i) ? <div className="timeblock-expand" /> : <div className="timeblock-empty" />}
            </Button>
          </OverlayTrigger>);
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
