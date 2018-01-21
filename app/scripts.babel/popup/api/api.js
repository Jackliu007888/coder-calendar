import axios from 'axios';

// http://api.dddog.com.cn/one/getData?type=r
const  url = 'http://api.dddog.com.cn/'

export function getOne(type) {
  
  return axios.get(`${url}one/getData?type=${type}`).then(res => {
    return Promise.resolve(res.data)
  })
}

