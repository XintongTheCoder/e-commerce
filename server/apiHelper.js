const axios = require('axios');
require("dotenv").config();


let options = {
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/', // added github api url (may need /users on the end)
  headers: {
    'User-Agent': 'request',
    'Authorization': process.env.TOKEN
  },
  accept: 'application/vnd.github+json'
};

const api = {

  get: function (endpoint) {
    console.log('apiHelper GET', endpoint);
    return axios.get(endpoint, options);
  },

  post: function (endpoint, data) {
    console.log('apiHelper POST');
    return axios.post(endpoint, data, options);
  },

  put: function (endpoint, data) {
    console.log('apiHelper PUT');
    return axios.put(endpoint, data, options);
  }

}


module.exports = api;