import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  members: [{
    username: { type: String, required: true },
    id: { type: String, required: true },
  }],
  projects: [String],
});

const UserSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  realname: { type: String, required: true },
  email: { type: String, required: true },
  team: [String],
  selectedteam: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
});

const ProjectSchema = new Schema({
  team: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  minDuration: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  finaldate: {
    date: { type: String, required: true },
    timeblocks: [Number],
  },
  deadline: { type: String, required: true },
  ended: { type: Boolean, required: true },
  superuser: { type: String, required: true },
  normaluser: [String],
  optionaluser: [String],
  closeduser: [String],
  votes: [{
    userid: { type: String, required: true },
    dates: [{
      date: { type: String, required: true },
      timeblocks: [Number],
    }],
  }],
});


const Team = mongoose.model('team', TeamSchema);

const User = mongoose.model('user', UserSchema);

const Project = mongoose.model('project', ProjectSchema);

module.exports = { Team, User, Project };
