const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const {Session} = require('../models/models');
const {testData} = require('./sessions-test-data');
const {app} = require('../index');




describe ('GET endpoint', () => {

    beforeEach( () => {
        console.info('seeding sessions')
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
            expect(session).to.have.property('descrition');
            expect(session).to.have.property('notes');
            expect(session).to.have.property('attendees');
            
            //checking it doesn't have non-serialized property
            expect(res).to.not.have.property('_id');
        });
    });
  
});