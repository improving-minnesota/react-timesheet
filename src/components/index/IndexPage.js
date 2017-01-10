import React, { Component, PropTypes } from 'react'
import { Redirect } from 'react-router'

class IndexPage extends Component {
  render() {
    return (
      <Redirect to="login" />
    )
  }
}

IndexPage.propTypes = {
}

export default IndexPage
