import axios from 'axios';


const axiosInstance = axios.create({

  ///
  // baseURL: "http://127.0.0.1:5001/clone-3e007/us-central1/api",

  //deployed version of firebase function
  // baseURL: "http://localhost:1234",


  //deployed version of amazon server or render.com
  baseURL: "https://amazon-api-deploy-jsi3.onrender.com/",
  
})

  
  export { axiosInstance };