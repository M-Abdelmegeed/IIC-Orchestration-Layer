const express = require('express');
const router = express.Router();
const waServiceManager = require('../../services/watson/conversation-manager');


const createSessionController = async (req, res, next) => {
   waServiceManager.createSession(req).then(async (data) => {
      res.json(data);
   }).catch(err => {
      console.error('Error message ' + err.message);
      var httpStatus = err.status || 500;
      res.status(httpStatus);
      res.json({ Error: err.message });
   })
};
module.exports = createSessionController
