import React, { Component } from 'react';
import './App.css';

class TitleRow extends Component {
  render() {
    const {inputParameters, outputParameters} = this.props.apiDefinition;
    const params = inputParameters.concat(outputParameters);
    const headers = params.map((title, index) => <th key={`${title}${index}`}>{title}</th>);
    return (
      <thead>
        <tr className="row inputOutput">
            <th colSpan={inputParameters.length}>{inputParameters.length > 0 ? 'Input' : ''}</th>
            <th colSpan={outputParameters.length}>{outputParameters.length > 0 ? 'Output' : ''}</th>
        </tr>
        <tr className="row title">
              {headers}
        </tr>
      </thead>
    );
  }
}

export default TitleRow;
