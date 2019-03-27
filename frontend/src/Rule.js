import React, { Component } from 'react';
import update from 'immutability-helper';

class Rule extends Component {

  updateRule = (e) => {
      const { target: element } = e;
      const data = element.dataset;
      const updatedRule = update(this.props.rule, {
        [data.io]: {
          [data.key] : { $set: element.value}
        }
      });
      this.props.update(updatedRule);
  }

  render() {
    const {inputParameters: inputParams, outputParameters: outputParams, rule} = this.props;
    const updateRule = this.updateRule.bind(this);
    const inputValues = inputParams.map((param) => <td key={`input-${param}`}><input data-io="input" data-key={param} value={rule.input[param]} onChange={updateRule} /></td>);
    const outputValues = outputParams.map((param) => <td key={`output-${param}`}><input data-io="output" data-key={param} value={rule.output[param]} onChange={updateRule}/></td>);
    return (
      <tr>
        {inputValues.concat(outputValues)}
      </tr>
    );
  }
}

export default Rule;
