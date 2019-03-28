import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { filesystemDatabase } from './adapters/LowdbAdapter';

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = 8080;
const db = filesystemDatabase('db.json');


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/:api', (req, res) => {
  const apiData = db.getApi(req.params.api);
  //delete apiData.ruleSet;
  res.json(apiData);
})

app.post('/api/:api', (req, res) => {
  const api = {...(db.getApi(req.params.api) || {}), ...req.body};
  filesystemDatabase
  res.sendStatus(200);
})

app.get('/api/:api/rules', (req, res) => {
  const apiData = db.getApi(req.params.api);
  
  res.json(apiData.ruleSet);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

