import React, { Component } from 'react';
import TitleRow from './TitleRow.js';
import RuleBody from './RuleBody.js';
import update from 'immutability-helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: "stateAbbreviations", apiDefinition: {description: "", inputParameters: [], outputParameters: [], ruleSet: []}};
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/${this.state.title}`)
      .then(res => res.json())
      .then(apiDefinition => this.setState({apiDefinition}));
  }

  updateRules(ruleSet) {
    this.setState(update(this.state, {apiDefinition: {ruleSet: {$set: ruleSet}}}));
  }

  saveChanges() {
    fetch(`http://localhost:8080/api/${this.state.title}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.apiDefinition)
    }).then(response => console.log(response));
  }

  render() {
    const { apiDefinition } = this.state;
    return (
      <div className="App">
        <button type="save" onClick={_ => this.saveChanges()}>Save</button>
        <input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
        <table>
          <TitleRow apiDefinition={apiDefinition}/>
          <RuleBody apiDefinition={apiDefinition} updateRules={this.updateRules.bind(this)}/>
        </table>
      </div>
    );
  }
}



export default App;
