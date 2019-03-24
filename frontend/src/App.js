import React, { Component } from 'react';
import TitleRow from './TitleRow.js';
import RuleCollection from './RuleCollection.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputParameters: [], outputParameters: [], ruleSet: []};
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/stateAbbreviations')
      .then(res => res.json())
      .then(json => this.setState({...json}));    
  }

  updateRules(ruleSet) {
    this.setState({ruleSet});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <TitleRow apiDefinition={this.state}/>
            <RuleCollection apiDefinition={this.state} updateRules={this.updateRules.bind(this)}/>
          </table>
        </header>
      </div>
    );
  }
}



export default App;
