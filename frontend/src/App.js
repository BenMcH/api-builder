import React from 'react';
import RuleSet from './RuleSet.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Route path="/:name" component={ruleSet} />
  </Router>
);

const ruleSet = ({match: {params: {name}}}) => (
    <div className="App">
      <RuleSet name={name} />
    </div>
);

export default App;
