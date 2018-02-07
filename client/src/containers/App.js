import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'
import { loadCommits, loadCommitFiles, loadFileAndPatch } from '../actions/git'
import io from 'socket.io-client'
import store from '../store'

const socket = io('http://localhost:3002')

class App extends Component {
  componentDidMount() {
    // socket.on('git commits', data => {
    //   this.props.loadCommits(data.commits)
    // })
    if (sessionStorage.getItem('mode') === 'slave') {
      socket.on('action', action => {
        console.log('action', action)
        store.dispatch(action)
      })
    }
    // socket.on('commit files', data => {
    //   this.props.loadCommitFiles(data)
    // })
    // socket.on('file content and patch', data => {
    //   this.props.loadFileAndPatch(data)
    // })
  }

  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {
  loadCommits,
  loadCommitFiles,
  loadFileAndPatch
})(App)
