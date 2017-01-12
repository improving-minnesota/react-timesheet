import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as userActions from '../../actions/user'

export class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = { redirectToReferrer: false, username: '', password: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    return this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.userActions.loginUser(this.state.username, this.state.password)
    .then(response => {
      if (!response.ok) return
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || '/'

    return (
      <div>
        {this.state.redirectToReferrer && (
          <Redirect to={from || '/home/projects'} />
        )}
        {from && (
          <p>
            You must login first.
          </p>
        )}
        <TextField
          name="username"
          floatingLabelText="Username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        {' '}
        <TextField
          name="password"
          type="password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <RaisedButton label="Login" primary={true} onClick={this.handleSubmit} />
      </div>
    )
  }
}

LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
