const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');

app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

module.exports = app;
