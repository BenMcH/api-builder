import React, {useState, useEffect} from 'react';
import RuleSet from './RuleSet.js';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Route path="/" exact render={() => (<Directory />)} />
    <Route path="/api/:name" component={ruleSet} />
  </Router>
);

const ruleSet = ({match: {params: {name}}}) => (
    <div className="App">
      <Link to="/">Back to Directory</Link>
      <RuleSet name={name} />
    </div>
);

const Directory = () => {
  const [apis, setApis] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api").then(response => response.json()).then(response => setApis(response.apis));
  }, [])
  return (
    <ul>
      {apis.map((value, index) => <li key={index}><Link to={`/api/${value}`}>{value}</Link></li>)}
    </ul>
  )
}

export default App;
