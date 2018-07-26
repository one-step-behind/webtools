import React from 'react';
import PropTypes from 'prop-types';

import config from '../config';

const Navigation = ({
  selectedPage,
  onClickNavigation,
}) => (
  <ul className="navigation">
    {
      config.navigationItems.map(item =>
        <li
          key={`navi-${item.id}`}
          className={selectedPage === item.id ? 'is-selected' : null}
          onClick={onClickNavigation}
          data-link={item.id}
        >
          {item.name}
        </li>
      )
    }
  </ul>
);

Navigation.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  onClickNavigation: PropTypes.func.isRequired,
};

export default Navigation; // Don’t forget to use export default!
