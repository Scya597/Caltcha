import React, { Component } from 'react';
import { SplitButton, MenuItem, Popover, OverlayTrigger, Navbar, NavItem, Nav, Button, ButtonGroup, Glyphicon, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.popover = (
      <Popover id="popover-trigger-click-root-close" title="No Team Selected" />
    );
    this.selectTeam = this.selectTeam.bind(this);
  }

  componentDidMount() {
    this.selectTeam(this.props.selectedTeam.id);
  }

  selectTeam = (teamId) => {
    if (typeof this.props.teams === 'undefined' || this.props.teams.length === 0) {
      axios.get('/api/team/select')
        .then((res) => {
          const selectedteam = res.data;
          axios.get('/api/profile')
            .then((resp) => {
              if (selectedteam.id.length === 0) {
                const team = resp.data.teams[0];
                const teamMemberCnt = team.members.length;
                this.popover = (
                  <Popover id="popover-trigger-click-root-close" title={`${teamMemberCnt} members`}>
                    {team.members.map(this.renderemail)}
                  </Popover>
                );
              } else {
                const teams = resp.data.teams;
                for (let i = 0; i < teams.length; i += 1) {
                  if (selectedteam.id === teams[i].id) {
                    const teamMemberCnt = teams[i].members.length;
                    this.popover = (
                      <Popover id="popover-trigger-click-root-close" title={`${teamMemberCnt} members`}>
                        {teams[i].members.map(this.renderemail)}
                      </Popover>
                    );
                  }
                }
              }
            })
            .catch((erro) => {
              console.log(erro);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const teamName = this.props.teams.find(team => team.id === teamId).name;
      const teamMemberCnt = this.props.teams.find(team => team.id === teamId).members.length;
      this.popover = (
        <Popover id="popover-trigger-click-root-close" title={`${teamMemberCnt} members`}>
          {this.renderMemberList(teamId)}
        </Popover>
      );
      this.props.setSelectedTeam({
        id: teamId,
        name: teamName,
      });
    }
  }

  renderTeamList() {
    if (typeof this.props.user.team === 'undefined' || this.props.user.team.length === 0) {
      return <option>No team, haha.</option>;
    } else {
      return this.props.user.team.map(item => <MenuItem value={item} key={item} eventKey={item}>{this.props.teams.find(team => team.id === item).name}</MenuItem>);
    }
  }

  renderMemberList(teamId) {
    const selectedTeamObj = this.props.teams.find(team => team.id === teamId);
    return selectedTeamObj.members.map(item => <li key={item.id}>{item.username} <a href={`mailto:${item.email}`}><u>{item.email}</u></a></li>);

  }
  renderemail = (item) => {
    return <li key={item.id}>{item.username} <a href={`mailto:${item.email}`}><u>{item.email}</u></a></li>;
  }

  handleNavLink() {
    window.location = '/logout';
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
          <Nav>
            <NavItem>
              <OverlayTrigger id="nav-overlay" trigger="click" rootClose placement="bottom" overlay={this.popover}>
                <SplitButton title={this.props.selectedTeam.name || 'Select Team'} id="dropdown-team-sel" onSelect={event => this.selectTeam(event)}>
                  {this.renderTeamList()}
                </SplitButton>
              </OverlayTrigger>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Navbar.Form>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="search" /></InputGroup.Addon>
                    <FormControl type="text" placeholder="Search" />
                  </InputGroup>
                </FormGroup>
              </Navbar.Form>
            </NavItem>
            <NavItem>
              <ButtonGroup>
                <Button>{this.props.user.username}</Button>
                <Button onClick={this.handleNavLink} bsStyle="danger">Logout</Button>
              </ButtonGroup>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default navbar;
