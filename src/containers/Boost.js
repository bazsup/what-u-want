import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Icon } from 'antd'

import Favicon from '../static/images/favicon.jpg'

class Boost extends Component {
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
              <Button type="primary" icon="download" size='large'>Download</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Boost
