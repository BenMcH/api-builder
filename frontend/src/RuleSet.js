import React, { Component } from 'react';
import TitleRow from './TitleRow.js';
import RuleBody from './RuleBody.js';
import update from 'immutability-helper';

const defaultState = {apiDefinition: {description: "", inputParameters: [], outputParameters: [], ruleSet: []}};

class RuleSet extends Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    this.fetchUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.setState(defaultState, this.fetchUpdate);
    }
  }

  fetchUpdate = () => fetch(`http://localhost:8080/api/${this.props.name}`)
                        .then(res => res.json())
                        .then(apiDefinition => this.setState({apiDefinition}));


  updateRules(ruleSet) {
    this.setState(update(this.state, {apiDefinition: {ruleSet: {$set: ruleSet}}}));
  }

  saveChanges() {
    fetch(`http://localhost:8080/api/${this.props.name}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.apiDefinition)
    }).then(response => console.log(response));
  }

  render() {
    const { apiDefinition } = this.state;
    const { name } = this.props;
    return (
      <div className="rule-set">
        <button type="save" onClick={_ => this.saveChanges()}>Save</button>
        <input type="text" value={name} readOnly={true} />
        <table>
          <TitleRow apiDefinition={apiDefinition}/>
          <RuleBody apiDefinition={apiDefinition} updateRules={this.updateRules.bind(this)}/>
        </table>
      </div>
    );
  }
}

export default RuleSet;
