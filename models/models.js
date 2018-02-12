'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const {DATABASE_URL} = require('./config');

const SessionSchema = mongoose.Schema({
  title: String,
  timeStart: { type: Date, required: true },
  timeEnd: { type: Date, required: true},
  location: {type: String, required: true},
  attendees: String
});

const LocationSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  hours: String,
  notes:[{type: String}],
  ratings: [{type: Number}]
});

//   songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
// });

// UserSchema.virtual('name').get(function () {
//   return `${this.firstName} ${this.lastName}`.trim();
// });

// SongSchema.methods.serialize = function () {
//   return {
//     id: this.id,
//     title: this.title,
//     artist: this.artist,
//     notes: this.notes,
//     lyrics: this.lyrics
//   };
// };

// UserSchema.methods.serialize = function () {
//   return {
//     id: this._id,
//     username: this.username,
//     name: this.name,
//     songs: this.songs.map(song => {
//       return {
//         id: song._id,
//         title: song.title,
//         artist: song.artist
//       };
//     })
//   };
// };

const Session = mongoose.model('Session', SessionSchema);
const Location = mongoose.model('Location', LocationSchema);

module.exports = { Session, Location };