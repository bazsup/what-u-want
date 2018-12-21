import React from 'react'
import { Link } from 'react-router-dom'
import { PostContext } from '../../context/post'

const Navbar = () => (
  <div>
    <Link to="/">Home</Link> | 
    <Link to="/boost">boost</Link> | 
    <Link to="/files">files</Link> | 
    <PostContext.Consumer>
      {posts => {
        return posts.map(post => (
          <React.Fragment key={post.key}>
            <Link to={`/post/${post.key}`}>post {post.name}</Link> | 
          </React.Fragment>
        ))
      }}
    </PostContext.Consumer>

    <Link to="/abcd">not found</Link>
  </div>
)

export default Navbar
