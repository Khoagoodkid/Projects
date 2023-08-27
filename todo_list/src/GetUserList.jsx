import React,{useState} from 'react'
import { url } from './StartFirebase'
function GetUserList() {
    const fetchedUserList =[]
    url.get('/users.json')
    .then(res => {
  
      
      for (let key in res.data) {
       
        fetchedUserList.push({
          email:res.data[key].email,
          name:res.data[key].name,
          password:res.data[key].password,
          // _id:res.data[key]._id,
          _id:key,
          color:res.data[key].color
        })
         
      }
    //   setUserList(fetchedUserList)
      
    })
    .catch(err => {
      console.log(err)
    })
  return fetchedUserList
    
  
}

export default GetUserList