/*
class User {
  constructor(Object user) {};
}
*/

export default class User {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.realname = user.realname;
    this.email = user.email;
    this.team = user.team;
  }
}
