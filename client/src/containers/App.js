import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'
import { getTextLines } from '../selectors'
import { removeLine } from '../actions'

class App extends Component {
  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = state => ({
  patch: state.patch,
  textLines: getTextLines(state)
})

export default connect(mapStateToProps, {
  removeLine
})(App)
