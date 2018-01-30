import React from 'react'
import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { setRepo, selectCommit, selectFile } from '../actions/git'

const DashboardContainer = props => <Dashboard {...props} />

const mapStateToProps = state => ({ git: state.git, patch: state.patch })

export default connect(mapStateToProps, {
  setRepo,
  selectCommit,
  selectFile
})(DashboardContainer)
