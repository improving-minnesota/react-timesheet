import React, { Component, PropTypes } from 'react'
import Header from '../header/Header'
import styles from './App.css'

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ])
}

export default App
