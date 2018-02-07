import React from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  fileName: state.git.fileName,
  patch: state.patch,
  fileContent: state.file,
  position: state.position
})

export default connect(mapStateToProps, {})(HomeContainer)
