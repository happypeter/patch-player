import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'
import { loadCommits, loadCommitFiles } from '../actions/git'
import io from 'socket.io-client'
const socket = io('http://localhost:3002')

class App extends Component {
  componentDidMount() {
    socket.on('git commits', data => {
      this.props.loadCommits(data.commits)
    })

    socket.on('commit files', data => {
      this.props.loadCommitFiles(data)
    })
  }
  
  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
  loadCommits,
  loadCommitFiles
})(App)
