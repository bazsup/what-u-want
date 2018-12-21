import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './containers/Home'
import Boost from './containers/Boost'
import Post from './containers/Post'
import NotFound from './containers/NotFound'
import Files from './containers/Files'

import Navbar from './components/core/Navbar'

import { PostContext } from './context/post'

import { getAll } from './tools/firebase'

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    this.getAllPost()  
  }

  getAllPost = () => {
    getAll('/post').on('value', (snap) => {
      const postValues = snap.val()
      if (!postValues) return this.setState({ posts: [] })

      const postKeys = Object.keys(snap.val()).reverse()
      
      const posts = postKeys.map((key) => {
        return {
          key,
          ...postValues[key]
        }
      })
      this.setState({ posts })
    })
  }
  render() {
    return (
      <PostContext.Provider value={this.state.posts}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:postid" component={Post} />
          <Route path="/boost" component={Boost} />
          <Route path="/files" component={Files} />
          <Route component={NotFound} />
        </Switch>
      </PostContext.Provider>
    )
  }
}

export default withRouter(App)
