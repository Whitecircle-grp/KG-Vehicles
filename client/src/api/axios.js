import axios from  'axios';

const instance= axios.create({
  baseURL:'https://auto-track-server.onrender.com/api',
  withCredentials:true
})

export default instance;