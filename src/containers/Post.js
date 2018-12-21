import React, { Component } from 'react'

class Post extends Component {

  get postId () {
    return this.props.match.params.postid
  }

  render () {
    return (
      <div>
        <h1>post {this.postId}</h1>
      </div>
    )
  }
}

export default Post
