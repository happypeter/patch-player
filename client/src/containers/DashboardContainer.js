import React from 'react'
import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { setProjectPath } from '../actions'
import { loadCommits } from '../actions/git'

const DashboardContainer = props => <Dashboard {...props} />

const mapStateToProps = state => ({commits: state.git})

export default connect(mapStateToProps, {
  setProjectPath,
  loadCommits
})(DashboardContainer)
