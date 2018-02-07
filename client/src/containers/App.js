import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'
import { loadCommitFiles, loadFileAndPatch } from '../actions/git'
import io from 'socket.io-client'
import store from '../store'
import { SERVER } from '../constants/ApiConstants'

const socket = io(SERVER)

class App extends Component {
  componentDidMount() {
    if (sessionStorage.getItem('mode') === 'slave') {
      socket.on('action', action => {
        store.dispatch(action)
      })
    }
  }

  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {
  loadCommitFiles,
  loadFileAndPatch
})(App)
