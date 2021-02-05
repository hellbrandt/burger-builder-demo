import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-d8614-default-rtdb.firebaseio.com/'
});

export default instance;