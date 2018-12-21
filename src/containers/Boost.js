import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import {
  Button,
  Card,
  notification
} from 'antd'



import { insert, update } from '../tools/firebase'

import Favicon from '../static/images/favicon.jpg'

import { PostContext } from '../context/post'

const Input = styled.input`
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #cdcdcd;
  outline: 0;
  transition: all 0.3s ease;
  :hover, :focus {
    border-color: #3CB288;
  }
  :focus {
    box-shadow: 0px 0px 0px 2px rgba(60, 178, 136, 0.3);
  }

`

const postCollection = '/post'

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message
  })
}

class Boost extends Component {
  state = {
    postname: '',
    description: ''
  }

  addPost = (event) => {
    event.preventDefault()
    const post = {
      name: this.state.postname,
      description: this.state.description,
    }
    console.log(post)
    insert(postCollection, post)
    openNotificationWithIcon('success', 'Add post success!')
    this.clearForm()
  }

  clearForm = () => {
    this.setState({
      postname: '',
      description: ''
    })
  }

  setField = (key, value) => {
    this.setState({ [key]: value })
  }

  remove = (event, postKey) => {
    event.preventDefault()
    update(`${postCollection}/${postKey}`, null)
    openNotificationWithIcon('success', 'Remove post success!')
  }

  render () {
    return (
      <Container>
        <Row>
          <Col className="mt-4">
            <h1>Boost</h1>
            <Row>
              <Col xs={12} md={4}>
              <img
                className="img-fluid"
                src={Favicon}
                alt="favicon meme"
              />
              <Button type="primary" icon="download" size="large" >Download</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4">
            <form onSubmit={this.addPost} method="POST">
              <div className="form-group">
                <label>Post name</label>
                <Input
                  className="control"
                  required
                  name="postname"
                  autoComplete="off"
                  onChange={(e) => { this.setField(e.target.name, e.target.value) }}
                  value={this.state.postname}
                  />
              </div>
              <div className="form-group">
                <label>Description</label>
                <Input
                  className="control"
                  value={this.state.description}
                  required
                  name="description"
                  autoComplete="off"
                  onChange={(e) => { this.setField(e.target.name, e.target.value) }}
                />
              </div>
              <Button type="primary" htmlType="submit" className="w-100 mt-3">Add</Button>
            </form>
          </Col>
        </Row>
        <Row>
          <Col className="my-4">
            <PostContext.Consumer>
              {(posts) => {
                return (
                  <>
                    {posts.map(post => (
                      <Card
                        key={post.key}
                        extra={<a onClick={(event) => { this.remove(event, post.key) }} href="/boost">Remove</a>}
                      >
                        <p>{post.name}</p>
                        <p>{post.description}</p>
                      </Card>
                    ))}
                  </>
                )
              }}
            </PostContext.Consumer>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Boost
