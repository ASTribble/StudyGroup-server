'use strict';

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  
  const sessions = [
    { day: 'Thursday', timeStart: '10:00', timeEnd: '12:00', location: 'Coffee Shop' },
    { day: 'Tuesday', timeStart: '13:00', timeEnd: '15:00', location: 'Coffee Shop' },
    { day: 'Wednesday', timeStart: '19:00', timeEnd: '21:00', location: 'Coffee Shop' }
  ];

  return res.json(sessions);
});






module.exports = router;