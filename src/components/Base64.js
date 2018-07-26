import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Base64Decode from './Base64Decode';
import Base64Encode from './Base64Encode';

import config from '../config';

class Base64 extends PureComponent {
  render() {
    const {
      onClickSubNavigation,
      selectedPage,
      selectedSubPage,
    } = this.props;

    return (
      <React.Fragment>
        <h1>
          Base64{' '}
          {
            config.navigationItems.find(page => page.id === selectedPage).children.map(e =>
              <React.Fragment key={`child-${e.id}`}>
                {' '}/{' '}
                <span
                  className={`sub-page-link ${selectedSubPage === e.id && 'is-selected'}`}
                  onClick={onClickSubNavigation}
                  data-link={e.id}
                >{e.name}</span>
              </React.Fragment>
            )
          }
        </h1>

        {
          selectedSubPage === 'decode' &&
          <Base64Decode />
        }
        {
          selectedSubPage === 'encode' &&
          <Base64Encode />
        }
      </React.Fragment>
    );
  }
}

Base64.propTypes = {
  onClickSubNavigation: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
  selectedSubPage: PropTypes.string.isRequired,
};

export default Base64;
