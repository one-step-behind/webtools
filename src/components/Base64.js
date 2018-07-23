import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Base64Decode from './Base64Decode';
import Base64Encode from './Base64Encode';

class Base64 extends PureComponent {
  render() {
    const {
      onClickSubNavigation,
      selectedSubPage,
    } = this.props;

    return (
      <React.Fragment>
        <h1>
          Base64{' '}
          <span className={`sub-page-link ${selectedSubPage === 'decode' && 'is-selected'}`} onClick={onClickSubNavigation} data-link="decode">Decode</span>
          {' '}/{' '}
          <span className={`sub-page-link ${selectedSubPage === 'encode' && 'is-selected'}`} onClick={onClickSubNavigation} data-link="encode">Encode</span>
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
  selectedSubPage: PropTypes.string.isRequired,
};

export default Base64;
