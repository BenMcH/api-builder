import express from "express";
import cors from 'cors';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = 8080;
const dbAdapter = new FileSync('db.json');
const db = low(dbAdapter);

db.defaults({ apis: {} }).write();

const getApi = (name) => db.get(`apis.${name}`).value();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/:api', (req, res) => {
  const apiData = getApi(req.params.api);
  //delete apiData.ruleSet;
  res.json(apiData);
})

app.post('/api/:api', (req, res) => {
  const apiData = getApi(req.params.api);
  //delete apiData.ruleSet;
  const api = {...(getApi(req.params.api) || {}), ...req.body};
  db.set(`apis.${req.params.api}`, api).write();
  res.sendStatus(200);
})

app.get('/api/:api/rules', (req, res) => {
  const apiData = getApi(req.params.api);
  
  res.json(apiData.ruleSet);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

