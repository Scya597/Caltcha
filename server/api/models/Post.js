import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
  id: String,
  name: String,
  members: [{
    username: String,
    id: String,
  }],
  projects: [String],
});

const UserSchema = new Schema({
  id: String,
  username: String,
  password: String,
  realname: String,
  email: String,
  team: [String],
  selectedteam: {
    id: String,
    name: String,
  },
});

const ProjectSchema = new Schema({
  team: String,
  id: String,
  title: String,
  minDuration: String,
  description: String,
  location: String,
  finaldate: {
    date: String,
    timeblocks: [Number],
  },
  deadline: String,
  ended: Boolean,
  superuser: String,
  normaluser: [String],
  optionaluser: [String],
  closeduser: [String],
  votes: [{
    userid: String,
    dates: [{
      date: String,
      timeblocks: [Number],
    }],
  }],
});

//const TeamMember = mongoose.model('teammember', TeamMemberSchema);
const Team = mongoose.model('team', TeamSchema);

//const UserSelected = mongoose.model('userselected', UserSelectedSchema);
const User = mongoose.model('user', UserSchema);

//const ProjectVoteDate = mongoose.model('projectvotedate', ProjectVoteDateSchema);
//const ProjectVote = mongoose.model('projectvote', ProjectVoteSchema);
const Project = mongoose.model('project', ProjectSchema);

//const Caltcha = mongoose.model('caltcha', CaltchaSchema);

module.exports = { Team, User, Project };
