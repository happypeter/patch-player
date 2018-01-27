import React from 'react'
import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { setProjectPath } from '../actions'
import { setRepo, selectCommit, selectFile } from '../actions/git'

const DashboardContainer = props => <Dashboard {...props} />

const mapStateToProps = state => ({ git: state.git, patch: state.patch })

export default connect(mapStateToProps, {
  setProjectPath,
  setRepo,
  selectCommit,
  selectFile
})(DashboardContainer)
