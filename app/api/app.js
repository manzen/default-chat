'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const watson = require("./modules/watson");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/conversation', (request, response) => {
  watson.create_session().then((result) => {
    watson.message(request.body.text, result.session_id).then((res) => {
      const resText = res.output.generic[0].text;
      response.send(resText);
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
