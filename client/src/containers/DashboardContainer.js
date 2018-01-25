import React from 'react'
import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { setProjectPath } from '../actions'

const DashboardContainer = props => <Dashboard {...props} />

const mapStateToProps = state => ({ })

export default connect(mapStateToProps, {
  setProjectPath
})(DashboardContainer)
