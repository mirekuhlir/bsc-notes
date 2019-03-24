import React, { Component } from 'react';
import Translate from '../localization/Translate';
import { LocalizationContext } from '../localization/LocalizationContext';

export default class DropdownMenu extends Component {
  state = {
    showMenu: false
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  render() {
    return (
      <div className="language-dropdown-menu">
        <button
          id="language-button"
          className="btn btn-primary btn-lg-min-width"
          onClick={this.showMenu}
        >
          <Translate string={'language'} />

          <LocalizationContext.Consumer>
            {value => (
              <span className="font-weight-bold">
                {': ' + value.toUpperCase()}
              </span>
            )}
          </LocalizationContext.Consumer>
        </button>

        {this.state.showMenu ? (
          <div
            className="language-dropdown-menu__items"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <button
              className="btn btn-dark rounded-0"
              id="en"
              onClick={this.props.changeLanguage}
            >
              EN
            </button>
            <button
              className="btn btn-dark rounded-0"
              id="cz"
              onClick={this.props.changeLanguage}
            >
              CZ
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
