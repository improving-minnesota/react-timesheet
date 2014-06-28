var _ = require('lodash'),
  db = require('../../src/services/db.js'),
  Q = require('q'); 


////////////  USERS //////////////////
function seed() {
  console.log('Seeding Users into DB');
  var users = require('../../data/users').users;
  var adminTimesheets = require('../../data/admin.timesheets').timesheets;
  var userTimesheets = require('../../data/user.timesheets').timesheets;
  var projects = require('../../data/projects').projects;

  Q.all([
    db.insert('projects', projects[0]),
    db.insert('projects', projects[1]),
    db.insert('projects', projects[2])
  ])

  .then(function () { 
    var userPromises = [];

    _.forEach(users, function (user) {
      console.log("Seeding " + user.username);

      db.insert('users', user)
        .then(function (newUser) {

          console.log("Created " + newUser.username);
          
          var timesheets = user.username === "admin" ? adminTimesheets: userTimesheets;

          _.forEach(timesheets, function (timesheet) {
            var timesheetModel = _.omit(timesheet, 'timeunits');
            timesheetModel.user_id = newUser._id;

            db.insert('timesheets', timesheetModel)
              .then(function (newTimesheet) {

                console.log("Seeding timeunits : " + timesheet.timeunits.length);
                
                _.forEach(timesheet.timeunits, function (timeunit) {
                  timeunit.timesheet_id = newTimesheet._id;

                  console.log("Attempting to seed timeunit : " + timeunit.project);
                  db.findOne('projects', {name: timeunit.project})
                    .then(function (project) {
                      timeunit.project_id = project._id;
                      return db.insert('timeunits', timeunit);
                    })
                    .then(function (newTimeunit) {
                      console.log("Created timeunit for " + newTimeunit.dateWorked);
                    })
                    .fail(function (err) {
                      console.log("Error : " + err);
                    });
                });
              });
          });
        });
    });
  })

  .then(function (){
    console.log("Created user " + user.username + " and timesheets.");
  })

  .fail(function (err) {
    console.log("Error creating " + user.username + " : " + err);
  });
}

db.findOne('users', {username: 'admin'})
  .then(function (user) {
      console.log("Found user. DB already seeded.");
      if (user === null) seed();
  })
  .fail(function (err) {
    console.log("Error : " + err);
  }); 
