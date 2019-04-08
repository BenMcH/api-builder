import React, {useState, useEffect} from 'react';
import RuleSet from './RuleSet.js';
import { Link } from './Utils.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Route path="/" exact component={Directory} />
    <Route path="/api/:name" component={RuleSet} />
  </Router>
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
