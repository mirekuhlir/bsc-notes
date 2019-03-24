import React from 'react';
import DropdownMenu from './DropdownMenu';
import Translate from '../localization/Translate';

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

export default Header;
