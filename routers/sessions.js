'use strict';

const express = require('express');
const router = express.Router();
const {Session} = require('../models/models');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');


router.get('/', (req, res) => {
  
  Session
    .find()
    .then(sessions => {
      res.json({
        sessions: sessions.map(
          (session) => session.serialize())
      });
    })
    .catch(err =>{
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.get('/:id', (req, res)=>{
  
  Session
    .findById(req.params.id)
    .then(session => res.json(session.serialize()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
  });
});

router.post('/', (req, res) => {

  const requiredFields = ['date', 'startTime', 'endTime', 'location'];
  
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  };

  Session
  .create({
    title: req.body.title,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    description: req.body.desciption,
    notes:req.body.notes,
    attendees: req.body.attendees
  })
  .then(session => res.status(201).json(session.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

module.exports = router;




