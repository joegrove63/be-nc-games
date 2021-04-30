const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

module.exports = app;
