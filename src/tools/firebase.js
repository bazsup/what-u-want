import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyBwih_FW9KhnN2598Bzv2pW9O3jTKGZfik",
  authDomain: "value-is-what-u-want.firebaseapp.com",
  databaseURL: "https://value-is-what-u-want.firebaseio.com",
  projectId: "value-is-what-u-want",
  storageBucket: "value-is-what-u-want.appspot.com",
  messagingSenderId: "589817397541"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase

export const db = firebase.database()

export const getAll = (collection) => db.ref(`${collection}`)

export const getOne = (collection, attr) => db.ref(`${collection}/${attr}`)

export const insert = (collection, value) => {
  const ref = db.ref(`${collection}`).push()
  // ref = newStoreRef.child('gallery').push()
  ref.set({
    ...value
  })

}

export const update = (collection, value) => db.ref(`${collection}`).set({ ...value })


firebase.auth().useDeviceLanguage()

export const facebookProvider = new firebase.auth.FacebookAuthProvider()

facebookProvider.addScope('email,user_photos')
facebookProvider.setCustomParameters({
  'display': 'popup'
})


export const uploadFile = (uid, file, view) => {
  
  const fileExt = file.name.split('.').pop()
  const name = file.name.split('.')[0]
  
  const fileKey = `${Date.now()}-${name}.${fileExt}`

  const storageRef = firebase.storage().ref(`files/${uid}/${fileKey}`)
  const task = storageRef.put(file)
    // .then(snapshot => snapshot)

  task.on('state_changed', (snapshot) => {
    console.log(snapshot.bytesTransferred, snapshot.totalBytes)
    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    view.setState({ percentage: percentage })
  }, (error) => {
    console.error('error')
  }, () => {
    storageRef.getMetadata().then((metadata) => {
        // Metadata now contains the metadata for 'filepond/${file.name}'
        let metadataFile = { 
            name: metadata.name, 
            size: metadata.size, 
            contentType: metadata.contentType, 
            fullPath: metadata.fullPath
        }

        //Process save metadata
        const databaseRef = firebase.database().ref(`/files/${uid}`);
        databaseRef.push({  metadataFile });

    }).catch(function(error) {
      console.error('upload error:', error.message)
    });
  })
}

export const getFile = (fullPath) => {
  const storageRef = firebase.storage().ref(fullPath)
  return storageRef
      .getDownloadURL()
      .then(url => {
        // console.log('91', url)
        return url
      })
      .catch(err => {
        if (err.code === 'storage/object-not-found') return null
        return null
      })
}

export const auth = firebase.auth