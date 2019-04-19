import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { filesystemDatabase } from './adapters/LowdbAdapter';

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = 8080;
const db = filesystemDatabase('db.json');

app.get('/api', (req, res) => {
  res.json({ apis: db.getApis() });
});

app.get('/api/:api', (req, res) => {
  const apiData = db.getApi(req.params.api);
  res.json(apiData);
});

app.put('/api/:api', (req, res) => {
  const api = { ...(db.getApi(req.params.api) || {}), ...req.body };
  db.setApi(req.params.api, api);
  res.sendStatus(200);
});

app.post('/api/:api', (req, res) => {
  const { body } = req;
  const api = db.getApi(req.params.api);
  const { inputParameters, outputParameters } = api;
  const checkInputParams = rule =>
    api.inputParameters.every(
      key =>
        !key ||
        key === '' ||
        (!rule.input[key] && !body[key]) ||
        rule.input[key] === '' ||
        rule.input[key] === body[key]
    );
  const rules = api.ruleSet
    .filter(checkInputParams)
    .map(rule => rule.output)
    .map(output => {
      const data = {};
      outputParameters.forEach(param => (data[param] = output[param]));
      return data;
    });
  res.json({ rules });
});

app.get('/api/:api/rules', (req, res) => {
  const apiData = db.getApi(req.params.api);

  res.json(apiData.ruleSet);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
