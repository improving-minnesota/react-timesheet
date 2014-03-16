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
      listenPort: 3000,
      securePort: 8400
    },

    debug : {
      listenPort: 3003,
      securePort: 8403
    },

    prod : {
      listenPort: 3033,
      securePort: 8433
    }
  }
};