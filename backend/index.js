import express from "express";
import cors from 'cors';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const app = express();
app.use(cors());
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

app.get('/api/:api/rules', (req, res) => {
  const apiData = getApi(req.params.api);
  
  res.json(apiData.ruleSet);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

