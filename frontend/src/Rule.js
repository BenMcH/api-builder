import React from 'react';
import update from 'immutability-helper';

const Rule = props => {

  const updateRule = (e) => {
      const { target: element } = e;
      const data = element.dataset;
      const updatedRule = update(props.rule, {
        [data.io]: {
          [data.key] : { $set: element.value}
        }
      });
      props.update(updatedRule);
  }

    const {inputParameters: inputParams, outputParameters: outputParams, rule} = props;
    const inputValues = inputParams.map((param) => <td key={`input-${param}`}><input data-io="input" data-key={param} value={rule.input[param]} onChange={updateRule} /></td>);
    const outputValues = outputParams.map((param) => <td key={`output-${param}`}><input data-io="output" data-key={param} value={rule.output[param]} onChange={updateRule}/></td>);
    return (
      <tr>
        {inputValues.concat(outputValues)}
      </tr>
    );
}

export default Rule;
