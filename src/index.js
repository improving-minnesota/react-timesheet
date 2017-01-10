import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import Routes from './routes'
import './index.css'

const store = configureStore()

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Routes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NewApp = require('./routes').default
    render(NewApp)
  })
}
