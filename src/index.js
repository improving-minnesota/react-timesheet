import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/store'
import Routes from './routes'
import { fetchUser } from './actions/user'
import './index.css'

injectTapEventPlugin()

const store = configureStore()

const render = (Component) => {
  store.dispatch(fetchUser())

  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Component store={store} />
      </MuiThemeProvider>
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
