import React from 'react';
import DropdownMenu from './DropdownMenu';
import Translate from '../localization/Translate';
import PropTypes from 'prop-types';

const Header = ({ changeLanguage }) => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <a className="brand navbar-brand font-weight-bold" href="/">
        BSC <Translate string={'header'} />
      </a>

      <DropdownMenu changeLanguage={changeLanguage} />
    </nav>
  );
};

Header.propTypes = {
  changeLanguage: PropTypes.func.isRequired
};

export default Header;
