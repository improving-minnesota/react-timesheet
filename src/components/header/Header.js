import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user'

export class Header extends Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
    console.log(this)
  }

  handleLogout(e) {
    e.preventDefault()
    console.log(this)
    this.props.userActions.logoutUser()
  }

  render() {
    return (
      <div>
        <span>Logged in as: {this.props.user.info.username || 'no one'}</span>
        {' '}
        { this.props.user.isLoggedIn && (<a href="" onClick={this.handleLogout}>Logout</a>) }
      </div>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
