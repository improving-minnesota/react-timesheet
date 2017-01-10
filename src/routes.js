import React, { Component, PropTypes } from 'react'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'react-redux'
import App from './components/app/App'
import IndexPage from './components/index/IndexPage'

export class Routes extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <App>
            <Match exactly pattern="/" component={IndexPage} />
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
