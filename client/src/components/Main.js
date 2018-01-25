import React, { Component } from 'react'
import Home from '../containers/HomeContainer'
import DashboardContainer from '../containers/DashboardContainer'
import '../assets/global.css'
import customHistory from '../utils/history'
import {
  Router,
  Route
} from 'react-router'
import HomeContainer from '../containers/HomeContainer';

class Main extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <div>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/dashboard' component={DashboardContainer} />
        </div>
      </Router>
    )
  }
}

export default Main
