import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({
  selectedPage,
  onClickNavigation,
}) => (
  <ul className="navigation">
    <li className={selectedPage === 'calculator' ? 'is-selected' : 'false'} onClick={onClickNavigation} data-link="calculator">
      Instant calculator
    </li>
    <li className={selectedPage === 'rgb2hex' ? 'is-selected' : 'false'} onClick={onClickNavigation} data-link="rgb2hex">
      RGB to Hex to RGB
    </li>
    <li className={selectedPage === 'slug' ? 'is-selected' : 'false'} onClick={onClickNavigation} data-link="slug">
      Slug
    </li>
    <li className={selectedPage === 'base64' ? 'is-selected' : 'false'} onClick={onClickNavigation} data-link="base64">
      Base64 Decode/Encode
    </li>
  </ul>
);

Navigation.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  onClickNavigation: PropTypes.func.isRequired,
};

export default Navigation; // Don’t forget to use export default!
