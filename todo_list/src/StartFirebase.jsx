import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {firebaseConfig} from './FireBaseConfig'
import axios from "axios";
const app = initializeApp(firebaseConfig)
 export const db = getDatabase(app)
 export const url = axios.create({
    baseURL:'https://todolist-88b8a-default-rtdb.asia-southeast1.firebasedatabase.app/'
  })

