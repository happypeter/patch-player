import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'
import { loadCommits } from '../actions/git'
import io from 'socket.io-client'
const socket = io('http://localhost:3002')

class App extends Component {
  componentDidMount() {
    socket.on('git commits', data => {
      console.log('git commits....', data.commits)
      this.props.loadCommits(data.commits)
    })
  }
  
  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { loadCommits })(App)
