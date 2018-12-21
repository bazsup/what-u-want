import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <div>
    <Link to="/">Home</Link> | 
    <Link to="/boost">boost</Link> | 
    <Link to="/post/1">post 1</Link> | 
    <Link to="/post/2">post 2</Link> | 
    <Link to="/abcd">not found</Link>
  </div>
)

export default Navbar
