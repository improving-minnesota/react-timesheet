import React, { Component, PropTypes } from 'react'
import { BrowserRouter, Match, Miss, Redirect } from 'react-router'
import { Provider } from 'react-redux'
import App from './components/app/App'
import IndexPage from './components/index/IndexPage'
import EmployeesPage from './components/employees/EmployeesPage'
import LoginPage from './components/login/LoginPage'
import ProjectsPage from './components/projects/ProjectsPage'
import TimesheetsPage from './components/timesheets/TimesheetsPage'

export class Routes extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <App>
            <Match pattern="/" exactly component={IndexPage} />
            <Match pattern="/login" exactly component={LoginPage} />
            <Match pattern="/home/projects" exactly component={ProjectsPage} />
            <Match pattern="/home/employees" exactly component={EmployeesPage} />
            <Match pattern="/home/timesheets" exactly component={TimesheetsPage} />
            <Miss render={() => <Redirect to="/" />} />
          </App>
        </BrowserRouter>
      </Provider>
    )
  }
}

Routes.propTypes = {
  store: PropTypes.object.isRequired
}

export default Routes
