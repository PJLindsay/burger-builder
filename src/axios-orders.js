import axios from 'axios'
import { firebaseurl } from './firebase.js'

const instance = axios.create({
  // baseURL: 'https://burger-builder-be3c9.firebaseio.com/'
  baseURL: firebaseurl,
})

export default instance
