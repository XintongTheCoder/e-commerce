const axios = require("axios");

const parse = {
  get: (url) => {
    // url parser
    return axios
      .get(url)
      .then((res) => {
        console.log("axios get response, res.data: ", res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("axios get error: ", err);
      });
  },

  post: (url, data) => {
    return axios
      .post(url, data)
      .then((res) => {
        console.log("axios post res", res);
      })
      .then((err) => {
        console.log("axios post err", err);
      });
  },

  put: (url, data) => {
    return axios
      .put(url, data)
      .then((res) => {
        console.log("axios put res", res);
      })
      .catch((err) => {
        console.log("axios put err", err);
      });
  },
};

module.exports = parse;