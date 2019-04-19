import React, { useState, useEffect } from 'react';
import { Link } from "./Utils";
import Rule from './Rule';
import update from 'immutability-helper';

const RuleSet = (props) => {
  const [description, setDescription] = useState("")
  const [inputParameters, setInputParameters] = useState([]);
  const [outputParameters, setOutputParameters] = useState([]);
  const [ruleSet, setRuleSet] = useState([]);
  const {match: {params: { name }}} = props;

  const fetchUpdate = () => fetch(`http://localhost:8080/api/${name}`)
                        .then(res => res.json())
                        .then(apiDefinition => {
                          setDescription(apiDefinition.description);
                          setInputParameters(apiDefinition.inputParameters);
                          setOutputParameters(apiDefinition.outputParameters);
                          setRuleSet(apiDefinition.ruleSet);
                        });


  useEffect(() => {fetchUpdate()}, [name]);
  const getValue = input => input && input.target && input.target.value ? input.target.value : input;
  const updateArray = (array, callback) => (index, e) => callback(update(array, {[index]: {$set: getValue(e)}}));
  const updateInputParameter = updateArray(inputParameters, setInputParameters);
  const updateOutputParameter = updateArray(outputParameters, setOutputParameters);
  const updateRule = updateArray(ruleSet, setRuleSet);
  const updateDescription = (e) => setDescription(e.target.value);
  const addToArray = (arr, updateFunc) => updateFunc([...arr, '']);

  const saveChanges = () => {
    fetch(`http://localhost:8080/api/${name}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description, inputParameters, outputParameters, ruleSet})
    });
  }

  return (
    <div className="rule-set">
      <Link to="/">Back to Directory</Link>
      <h1>{name}</h1>
      <button type="save" onClick={saveChanges.bind(null)}>Save</button>
      <section>
        <input type="text" value={description} onChange={updateDescription} />
      </section>
      <table>
        <thead>
          <tr>
            <th colSpan={inputParameters.length}>Input <button onClick={addToArray.bind(this, inputParameters, setInputParameters)}>+</button></th>
            <th colSpan={outputParameters.length}>Output <button onClick={addToArray.bind(this, outputParameters, setOutputParameters)}>+</button></th>
          </tr>
          <tr>
            {inputParameters.map((value, index) => <th key={index}><input type="text" value={value} onChange={updateInputParameter.bind(this, index)} /></th>)}
            {outputParameters.map((value, index) => <th key={index}><input type="text" value={value} onChange={updateOutputParameter.bind(this, index)} /></th>)}
          </tr>
        </thead>
        <tbody>
          {ruleSet.map((rule, index) => <Rule key={index} inputParameters={inputParameters} outputParameters={outputParameters} rule={rule} update={updateRule.bind(this, index)}/>)}
        </tbody>
      </table>
    </div>
  );
}

export default RuleSet;
