import React, { Component } from 'react';
import { LocalizationContext } from './LocalizationContext';

import en from './en.json';
import cz from './cz.json';

export default class Translate extends Component {
  state = {
    languages: {
      en,
      cz
    }
  };

  render() {
    const { languages } = this.state;
    const { string } = this.props;
    return (
      <LocalizationContext.Consumer>
        {value => languages[value][string]}
      </LocalizationContext.Consumer>
    );
  }
}
