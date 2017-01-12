import React, { PropTypes } from 'react'
import { Match, Redirect } from 'react-router'

const MatchWhenAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Match {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

MatchWhenAuthorized.propTypes = {
  component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default MatchWhenAuthorized
