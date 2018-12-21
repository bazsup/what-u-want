import React, { Component } from 'react'
import {
  Button,
  message
} from 'antd'


import { auth, facebookProvider, uploadFile, getAll, getFile } from '../tools/firebase'

class Files extends Component {

  state = {
    loggedIn: false,
    uid: '',
    displayName: '',
    photoURL: '',
    loading: true,
    percentage: 0,
    files: []
  }

  componentDidMount() {
    this.authChanged()  
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  changeFile = (event) => {
    const files = event.target.files
    if (!!files.length) {
      const file = files[0]
      console.log('upload file')
      uploadFile(this.state.uid, file, this)
    }
  }

  listMyFile = () => {
    getAll(`files/${this.state.uid}`).on('value', (snapshot) => {
      const values = snapshot.val()
      const keys = Object.keys(values)
      const data = keys.map(key => {
        return {
          key,
          ...values[key].metadataFile
        }
      })
      this.setState({ files: data })
    })
  }

  authChanged = () => {
    auth().onAuthStateChanged(async user => {
      if (user) {
        console.log(user)
        this.setState({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          loggedIn: true
        })
        this.listMyFile()
      }
      this.setState({ loading: false })
    })
  }

  login = () => {
    auth().signInWithPopup(facebookProvider).then(result => {
    }).catch(error => {
    })
  }

  logout = () => {
    auth().signOut().then(() => {
      // Sign-out successful.
      console.log('sign out')
      this.setState({
        loggedIn: false
      })
    }).catch(function(error) {
      console.error('error', error)
      // An error happened.
    })
  }

  download = async (fullPath) => {
    const data = await getFile(fullPath)
    console.log(data)
    const link = document.createElement('a')
    link.href = data
    link.target = '_blank'
    link.click()
  }

  render () {
    if (this.state.loading) return <div>Loading ..</div>
    return (
      <div>
        {this.state.loggedIn ? (
          <>
            <div>
              <Button size="large" onClick={this.logout}>Logout</Button>
              <img className="img-thumbnail" src={this.state.photoURL} width="50" alt="profile" />
              Welcome, {this.state.displayName}
            </div>
            <div>
              <input type="file" onChange={this.changeFile} />
              {this.state.percentage}
            </div>
            <div>
              {this.state.files.map(file => (
                <div key={file.key}>
                  {file.name}
                  {/* {file.fullPath} */}
                  <button onClick={() => { this.download(file.fullPath) } }>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Button type="primary" size="large" icon="facebook" onClick={this.login}>Login with Facebook</Button>
        )}
        
      </div>
    )
  }
}

export default Files
