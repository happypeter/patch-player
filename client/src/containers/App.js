import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'

class App extends Component {
  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(App)
