import React, { Component } from 'react';
import Rule from './Rule.js';
import update from 'immutability-helper';

class RuleBody extends Component {
  updateRule = (index, rule) => {
    this.props.updateRules(update(this.props.apiDefinition.ruleSet, {
      [index]: { $set: rule}
    }));
  }

  render() {
    const {inputParameters, outputParameters, ruleSet} = this.props.apiDefinition;
    return (
      <tbody>
        {ruleSet.map((rule, index) => <Rule key={index} inputParameters={inputParameters} outputParameters={outputParameters} rule={rule} update={(rule) => this.updateRule(index, rule)}/>)}
      </tbody>
    );
  }
}

export default RuleBody;
