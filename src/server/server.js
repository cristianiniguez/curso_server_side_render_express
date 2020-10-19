/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';

dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpacDevMiddleware = require('webpack-dev-middleware');
  const webpacHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    port: PORT,
    hot: true,
  };
  app.use(webpacDevMiddleware(compiler, serverConfig));
  app.use(webpacHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  console.log('Hello');
  res.send({ hello: 'express' });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
