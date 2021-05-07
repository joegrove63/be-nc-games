const endpoints = require('../endpoints.json');

const getEndpoints = (request, response) => {
  response.send(endpoints);
};

module.exports = getEndpoints;
