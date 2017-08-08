import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function handleNavLink() {
  window.location = '/logout';
}

class navbarSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar className="nav-not-react">
        <Navbar.Header>
          <Navbar.Brand>
            <h2 className="logo">
              <span className="letter letter-width">c</span>
              <span className="awesome letter-width">a</span>
              <span className="wtf letter-width">l</span>
              <span className="cool letter-width">t</span>
              <span className="awesome letter-width">c</span>
              <span className="letter letter-width">h</span>
              <span className="wtf letter-width">a</span>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="team">
            <NavItem>
              <div id="nav-simple-team-label">{this.props.teamName || 'Error'}</div>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <ButtonGroup>
                <Button><Link to="/">{this.props.userName}</Link></Button>
                <Button onClick={() => handleNavLink()} bsStyle="danger"><Glyphicon glyph="log-out" /> Logout</Button>
              </ButtonGroup>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default navbarSimple;
