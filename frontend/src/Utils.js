import React from 'react';
import { Link as DomLink } from 'react-router-dom';

export const Link = (props) => (<DomLink to={props.to} className="App-link">{props.children}</DomLink>)