describe('Employees', function() {

  var expect = chai.expect;
  var $rootScope,
    $controller,
    $httpBackend,
    $state,
    $stateParams,
    $scope,
    $api,
    controller, 
    employee,
    spies;
 
  describe('Controllers:', function() {
      
    beforeEach(
      module(
        'ngResource',
        'app.resources',
        'security.services',
        'notifications.services',
        'app.employees',
        'app.employees.controllers'
      ));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$state_, _$stateParams_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $state = _$state_;
      $stateParams = _$stateParams_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {
      var notifications = $injector.get('notifications');

      spies = {
        error: sinon.spy(notifications, 'error'),
        success: sinon.spy(notifications, 'success'),
        state: sinon.stub($state)
      };

      employee = {
        "_id": "1234567890",
        "username": "test", 
        "email": "test@test.com", 
        "password": "password", 
        "admin": true, 
        "firstName": "Test", 
        "lastName": "User"
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('EmployeeCtrl', function() {

      beforeEach(function() {
        $scope = $rootScope.$new();
        controller = $controller("EmployeeCtrl", { 
          $scope: $scope,
          $state: spies.state,
          $stateParams: $stateParams
        });

        $httpBackend.when('GET', '/users?page=1&sort=%7B%22username%22:1%7D').respond(200);
        $httpBackend.when('GET', '/users?page=2&sort=%7B%22username%22:1%7D').respond(200, {name: 'pageConfig2'});
      });

      describe('during setup', function () {
        it('should be able to instantiate the controller and request a page of employees', function () { 
          expect(controller).to.be.ok; 
          // $scope.requestEmployees is called upon controller creation

          // TODO : set an expectation for to request employees on set up and flush httpBackend
        });
      }); 

      describe('requesting employees', function () {

        // TODO : verify it should set the result to the pageConfig object

      });

      describe('showing employee detail', function () {
        it('should notify the user if the employee is deleted', function () {
          employee.deleted = true;
          $httpBackend.flush();
          $scope.showDetail(employee);
          expect(spies.error).to.have.been.calledWith('You cannot edit a deleted employee.');
        });
        it('should transition to the employee detail state', function () {
          $httpBackend.flush();
          $scope.showDetail(employee);
          expect(spies.state.go).to.have.been.calledWith('app.employees.detail');
        });
      });

      describe('creating a new employee', function () {
        it('should transition to the create employee state', function () {
          $httpBackend.flush();
          $scope.createNew();
          expect(spies.state.go).to.have.been.calledWith('app.employees.create');
        });
      });

      describe('removing a employee', function () {

        it('should send a remove request for the specified employee', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/users/' + employee._id).respond(200);
          $scope.remove(employee);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(200);
          });

          it('should set the employee to deleted for the ui', function () {
            $scope.remove(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.true;
          });
          it('should notify the user of the deletion', function () {
            $scope.remove(employee);
            $httpBackend.flush();
            expect(spies.success).to.have.been.called;
            expect(spies.error).to.not.have.been.called;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(500);
          });

          it('should set deleted to false for the employee in the ui', function () {
            $scope.remove(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.false;
          });
          it('should notify the user of the error', function () {
            $scope.remove(employee);
            $httpBackend.flush();
            expect(spies.error).to.have.been.called;
            expect(spies.success).to.not.have.been.called;
          });
        });

      });

      describe('restore', function () {
        beforeEach(function () {
          employee.deleted = true;
        });

        it('should send a restore request for the specified employee', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/users/' + employee._id).respond(200);
          $scope.restore(employee);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(200);
          });

          it('should set the employee to not deleted for the ui', function () {
            $scope.restore(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.false;
          });
          it('should notify the user of the deletion', function () {
            $scope.restore(employee);
            $httpBackend.flush();
            expect(spies.success).to.have.been.called;
            expect(spies.error).to.not.have.been.called;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(500);
          });

          it('should set deleted to true for the employee in the ui', function () {
            $scope.restore(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.true;
          });
          it('should notify the user of the error', function () {
            $scope.restore(employee);
            $httpBackend.flush();
            expect(spies.error).to.have.been.called;
            expect(spies.success).to.not.have.been.called;
          });
        });
      });

      describe('cancel', function () {
        it('should return back to the employee list', function () {
          $httpBackend.flush();
          $scope.cancel();
          expect(spies.state.go).to.have.been.calledWith('app.employees');
        });
      });

    });

    describe('EmployeeDetailCtrl', function() {
      
      beforeEach(function() {
        spies.state.current = {data: {saveText: 'update'}};

        $scope = $rootScope.$new();
        controller = $controller("EmployeeDetailCtrl", {
          $scope: $scope,
          employee: new $api.employees(employee),
          $state: spies.state,
          $stateParams: $stateParams
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        it('should set saveText to the current state saveText', function () {
          expect($scope.saveText).to.equal('update');
        });

        it('should set the employee on scope to the resolved employee', function () {
          expect($scope.employee._id).to.equal(employee._id);
          expect($scope.employee.username).to.equal(employee.username);
        });
      });

      describe('Saving an edited employee', function () {
        var updatedEmployee;

        beforeEach(function () {
          updatedEmployee = angular.extend(employee, {username: 'updated'});
          $httpBackend.expect('PUT', '/users/' + employee._id);
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('PUT', '/users/' + employee._id).respond(200, updatedEmployee);
          });

          it('should set the employee on scope to be the updated employee', function () {
            $scope.save();
            $httpBackend.flush();
            expect($scope.employee.username).to.equal(updatedEmployee.username);
          });

          it('should notify the user of the successful update', function () {
            $scope.save();
            $httpBackend.flush();
            expect(spies.success).to.have.been.called;
            expect(spies.error).to.not.have.been.called;
          });
        });

        describe('in error', function () {
          it('should notify the user of the error', function () {
            $httpBackend.when('PUT', '/users/' + employee._id).respond(500);
            $scope.save();
            $httpBackend.flush();
            expect(spies.error).to.have.been.called;
            expect(spies.success).to.not.have.been.called;
          });
        });

      });
    });

    describe('EmployeeCreateCtrl', function() {

      beforeEach(function() {
        spies.state.current = {data: {saveText: 'create'}};

        $scope = $rootScope.$new();
        controller = $controller("EmployeeCreateCtrl", {
          $scope: $scope,
          $state: spies.state,
          $stateParams: $stateParams
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        it('should set saveText to the current state saveText', function () {
          expect($scope.saveText).to.equal('create');
        });
        
        it('should set the employee on scope to a non admin user', function () {
          expect($scope.employee.admin).to.be.false;
          expect($scope.employee.username).to.be.empty;
        });
      }); 

      describe('saving a new employee', function () {

        beforeEach(function () {
          $httpBackend.expect('POST', '/users');
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('POST', '/users').respond(200, employee);
          });

          it('should transition to the detail page of the created employee', function () {
            $scope.save();
            $httpBackend.flush();
            expect(spies.state.go).to.have.been.calledWith('app.employees.detail', {_id: employee._id});
          });

          it('should notify the user of the successful create', function () {
            $scope.save();
            $httpBackend.flush();
            expect(spies.success).to.have.been.called;
            expect(spies.error).to.not.have.been.called;
          });
        });

        describe('in error', function () {
          it('should notify the user of the error', function () {
            $httpBackend.when('POST', '/users').respond(500);
            $scope.save();
            $httpBackend.flush();
            expect(spies.error).to.have.been.called;
            expect(spies.success).to.not.have.been.called;
          });
        });
      });

    });

  });
});
