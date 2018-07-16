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
          <span className={`subPage ${selectedSubPage === 'decode' && 'is-selected'}`} onClick={onClickSubNavigation} data-link="decode">Decode <i className="fa fa-folder-open-o" /></span>
          /
          <span className={`subPage ${selectedSubPage === 'encode' && 'is-selected'}`} onClick={onClickSubNavigation} data-link="encode">Encode <i className="fa fa-folder-o" /></span>
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
