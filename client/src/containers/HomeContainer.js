import React from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { handleMutations } from '../actions'
import { getTextLines } from '../selectors'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  file: state.git.file,
  patch: state.patch,
  textLines: getTextLines(state)
})

export default connect(mapStateToProps, {
  handleMutations
})(HomeContainer)
