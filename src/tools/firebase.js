import firebase from "firebase"

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

export const auth = firebase.auth