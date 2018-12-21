import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './containers/Home'
import Boost from './containers/Boost'
import Post from './containers/Post'
import NotFound from './containers/NotFound'

import Navbar from './components/core/Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:postid" component={Post} />
          <Route path="/boost" component={Boost} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
