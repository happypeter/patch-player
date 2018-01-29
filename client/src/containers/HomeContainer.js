import React from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { handleMutations } from '../actions'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  fileName: state.git.file,
  patch: state.patch,
  file: state.file,
  position: state.position
})

export default connect(mapStateToProps, {
  handleMutations
})(HomeContainer)
