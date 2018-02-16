'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SessionSchema = mongoose.Schema({
  title: String,
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true},
  location: {type: String, required: true},
  notes:[{type: String}],
  attendees: [{type: String}],
});

const LocationSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  hours: String,
  notes:[{type: String}],
  ratings: [{type: Number}]
});

SessionSchema.methods.serialize = function(){
  return {
    id: this.id,
    title: this.title,
    date: this.date,
    startTime: this.startTime,
    endTime: this.endTime,
    location: this.location,
    description: this.description,
    notes: this.notes,
    attendees: this.attendees
  }
}


const Session = mongoose.model('Session', SessionSchema);
const Location = mongoose.model('Location', LocationSchema);

module.exports = { Session, Location };

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

