/*global module, require, console*/
/*jslint nomen: false*/
module.exports = {

  appName: "timesheet-api",

  session : {
    secret : "d0853b30-3d95-11e2-a25f-0800200c9a66", // uuid hash
    maxAge : new Date(Date.now() + 300000),
    key : 'express.sid'
  },

  security : {
    cookieSecret: 'timesheet-cookie-secret'
  },

  server : {
    dev : {
      port: 3000
    },

    debug : {
      port: 3003
    },

    prod : {
      port: 3033
    }
  },

  proxy : {
    '\/api\/.*' : {
      target: 'http://localhost:8080/api/',
    }
  }
};