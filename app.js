const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === '22P02') {
    res.status(400).send({
      msg: 'Bad Request :('
    });
  } else if (err.code === '23502') {
    res.status(400).send({
      msg: 'Bad Request - Missing required fields'
    });
  } else if (err.code === '23503') {
    res.status(400).send({
      msg: 'Bad Request :('
    });
  } else {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error :(' });
  }
});

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

module.exports = app;
