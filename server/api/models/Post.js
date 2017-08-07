import mongoose, { Schema } from 'mongoose';

const TeamMemberSchema = new Schema({
  username: String,
  id: String,
});
const TeamSchema = new Schema({
  id: String,
  name: String,
  members: [Object], //TeamMemberSchema
  projects: [String],
});

const UserSelectedSchema = new Schema({
  id: String,
  name: String,
});
const UserSchema = new Schema({
  id: String,
  username: String,
  password: String,
  realname: String,
  email: String,
  team: [String],
  selectedteam: [Object], //UserSelectedSchema
});
const ProjectVoteDateSchema = new Schema({
  date: Number,
  timeblocks: [String],
});
const ProjectVoteSchema = new Schema({
  userid: String,
  dates: [Object], //ProjectVoteDateSchema
});
const ProjectSchema = new Schema({
  team: String,
  id: String,
  title: String,
  minDuration: Number,
  description: String,
  location: String,
  finaldate: {
    date: Number,
    timeblocks: [Number],
  },
  deadline: Number,
  ended: Boolean,
  superuser: String,
  normaluser: [String],
  optionaluser: [String],
  closeduser: [String],
  votes: [Object], //ProjectSchema
});


const CaltchaSchema = new Schema({
  teams: [Object], //TeamSchema
  users: [Object], //UserSchema
  projects: [Object], //ProjectSchema
});

const Caltcha = mongoose.model('caltcha', CaltchaSchema);

module.exports = Caltcha;
