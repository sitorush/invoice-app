const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./api/config');
const actions = require('./api/actions/index');
const { mapUrl } = require('./api/helper/mapUrl.js');
const PrettyError = require('pretty-error');
const { MongoClient } = require('mongodb');

const pretty = new PrettyError();
const app = express();

app.use(session({
  secret: 'there is no secret!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('PAGE NOT FOUND');
  }
});

if (config.port) {
  MongoClient.connect(config.mongoUrl, (err, database) => {
    if (err) return console.log(err);

    app.set('database', database);

    /**
     * Listen on provided port, on all network interfaces.
     */
    app.listen(config.port, (ex) => {
      if (ex) {
        console.error(ex);
      }
      console.info('----\n==> 🌎  API is running on port %s', config.port);
      console.info('==> 💻  Send requests to http://%s:%s', config.host, config.port);
    });
  });


} else {
  console.error('==>     ERROR: No PORT environment constiable has been specified');
}
