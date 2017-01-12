import React, { Component, PropTypes } from 'react'
import { BrowserRouter, Match, Miss, Redirect } from 'react-router'
import { connect, Provider } from 'react-redux'
import App from './components/app/App'
import IndexPage from './components/index/IndexPage'
import EmployeesPage from './components/employees/EmployeesPage'
import LoginPage from './components/login/LoginPage'
import MatchWhenAuthorized from './components/auth/MatchWhenAuthorized'
import ProjectsPage from './components/projects/ProjectsPage'
import TimesheetsPage from './components/timesheets/TimesheetsPage'

export class Routes extends Component {
  render() {
    const isAuthenticated = this.props.user.isLoggedIn

    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <App>
            <Match pattern="/" exactly component={IndexPage} />
            <Match pattern="/login" exactly component={LoginPage} />
            <MatchWhenAuthorized pattern="/home/projects" exactly component={ProjectsPage} isAuthenticated={isAuthenticated} />
            <MatchWhenAuthorized pattern="/home/employees" exactly component={EmployeesPage} isAuthenticated={isAuthenticated} />
            <MatchWhenAuthorized pattern="/home/timesheets" exactly component={TimesheetsPage} isAuthenticated={isAuthenticated} />
            <Miss render={() => <Redirect to="/" />} />
          </App>
        </BrowserRouter>
      </Provider>
    )
  }
}

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Routes)
