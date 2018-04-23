'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const moment = require('moment');

const expect = chai.expect;

const {Session} = require('../models/models');
const testData = require('./sessions-test-data');
const {app} = require('../index');




describe ('GET endpoint', () => {

  beforeEach( () => {
    console.info('seeding sessions');
    return Session.insertMany(testData);
  });


  it('Should return all sessions', () => {
    return chai.request(app)
      .get('/sessions')
      .then(res => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('sessions');

        const sessions = res.body.sessions;
        expect(sessions).to.be.an('array');
        expect(sessions.length).to.equal(3);

        const session = sessions[0];
        expect(session).to.be.an('object');
        expect(session).to.not.be.empty;
      });
  });

  it('Should return serialized sessions', () => {
    return chai.request(app)
      .get('/sessions')
      .then(res => {
        const session = res.body.sessions[0];
        //checking all serialized properties
        expect(session).to.have.property('id');
        expect(session).to.have.property('title');
        expect(session).to.have.property('startTime');
        expect(session).to.have.property('endTime');
        expect(session).to.have.property('location');
        expect(session).to.have.property('description');
        expect(session).to.have.property('notes');
        expect(session).to.have.property('attendees');

        //checking it doesn't have non-serialized property
        expect(res).to.not.have.property('_id');
      });
  });

});

describe('GET/:id Endpoint', () => {

  let session;
  let id;

  beforeEach(() => {
    console.log('seeding sessions');
    return Session.insertMany(testData)
      .then(() => {
        return Session.findOne()
          .then(res => {
            session = res;
            id = res._id;
            console.log('id:', id);
            console.log('session', session);
          });
      });
  });

  it('Should return session with valid id', () => {
        
    return chai.request(app)
      .get(`/sessions/${id}`)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.empty;

        const _session = res.body;
        //expect the properties from the endpoint to be the same 
        //as the properties from the database object
        expect(_session.title).to.equal(session.title);      
        expect(_session.location).to.equal(session.location);
        expect(_session.description).to.equal(session.description);
        //the equality was tricky with arrays and dates
        expect(_session.startTime).to.exist;
        expect(_session.endTime).to.exist;    
        expect(_session.notes.length).to.equal(session.notes.length);
        expect(_session.attendees.length).to.equal(session.attendees.length);
      });
  });

  // it.only('Should reject invalid id', () => {
  //     const badId = 'badId87654';

  //     return chai.request(app)
  //     .get(`/sessions/${badId}`)
  //     .then(res => {
  //        expect(res).to.be.rejected;
  //     })
      
  // });

});

describe('POST endpoint', () => {
  
  const newSession = {
    title: 'Title 1',
    startTime: '2020-01-01T12:00:00-06:30',
    endTime: '2020-01-01T13:00:00-06:30',
    location: 'Coffee Shop',
    description: 'Description',
    notes: ['note 1.1', 'note 1.2', 'note 1.3'],
    attendees: ['Scott', 'John', 'Oscar']
  };

  it('Should add a session', () => {

    return chai.request(app)
      .post('/sessions')
      .send(newSession)
      .then( () => {
        return Session.find()
          .then( res => {
            console.log('res', res);
            expect(res).to.be.an('array');
            expect(res.length).to.equal(1);
            const session = res[0];

            expect(session).to.be.an('object');
            expect(session).to.have.property('title', newSession.title);
            expect(session).to.have.property('startTime');
            expect(session).to.have.property('endTime');
            expect(session).to.have.property('location', newSession.location);
            expect(session).to.have.property('description', newSession.description);
          });
      });
  });


  it.only('Should fail if missing location field', () => {
    const badLocation = {
      startTime: '2020-01-01T12:00:00-06:30',
      endTime: '2020-01-01T13:00:00-06:30'
    };

    return chai.request(app)
      .post('/sessions')
      .send(badLocation)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body).to.equal('Missing `location` in request body');
      });
  });


  it.only('Should fail if missing startTime field', () => {
    const badStart = {
      endTime: '2020-01-01T13:00:00-06:30',
      location: 'Coffee Shop'
    };

    return chai.request(app)
      .post('/sessions')
      .send(badStart)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body).to.equal('Missing `startTime` in request body');
      });
  });

  it.only('Should fail if missing endTime field', () => {
    const badEnd = {
      startTime: '2020-01-01T12:00:00-06:30',
      location: 'Coffee Shop'
    };

    return chai.request(app)
      .post('/sessions')
      .send(badEnd)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body).to.equal('Missing `endTime` in request body');
      });
  });
});