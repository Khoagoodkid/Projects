import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs } from 'firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyApWYWkSb_HJQadX8qztfE_I17yf6LJfWs",
  authDomain: "test-6e1ac.firebaseapp.com",
  projectId: "test-6e1ac",
  storageBucket: "test-6e1ac.appspot.com",
  messagingSenderId: "14156452871",
  appId: "1:14156452871:web:93faaf14d7997b15cec6a2",
  measurementId: "G-6Y0YV0Q9W6"
})
const apiCall =  async () => {
  const database = getFirestore(app)
  const foodCol = collection(database, 'food_information');
  const foodSnapshot = await getDocs(foodCol);
  const foodList = foodSnapshot.docs.map(doc => doc.data());

}

apiCall()
