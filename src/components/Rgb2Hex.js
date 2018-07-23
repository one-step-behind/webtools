import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';

import classNames from 'classnames';

const fieldsCount = 10;

class Rgb2Hex extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rgbValues: [],
      hexValues: [],
    };
  }

  componentDidMount() {
    let rgbValues = [];
    let hexValues = [];

    /* read local storage rgb value if exists and generate hex value */
    for (let i = 0; i < fieldsCount; i++) {
      let lsItem = localStorage.getItem('rgb-'+i);

      if (lsItem) {
        rgbValues[i] = lsItem;
        hexValues[i] = this.rgb2hex(lsItem, i);
      }
    }

    this.setState({
      rgbValues,
      hexValues
    });

    // Currently just for testing
    //console.log('rgba(236, 56, 52)', this.getRGBa('rgba(236, 56, 52)'));
    //console.log('rgba(236, 56, 52, .8)', this.getRGBa('rgba(236, 56, 52, .8)'));
    //console.log('rgba(236, 56, 52, 10 %)', this.getRGBa('rgba(236, 56, 52, 10 %)'));
  }

  changeRgb2hex = (e) => {
    if (e.target) {
      e = e.target;
    }

    let index = /[\d]/;
    let targetIndex = e.id.match(index)[0];

    this[`hexInput${targetIndex}`].value = '';
    this[`exampleBg${targetIndex}`].style.backgroundColor = 'initial';
    this[`exampleText${targetIndex}`].style.color = 'initial';

    let [...rgbValues] = this.state.rgbValues;
    rgbValues[targetIndex] = e.value;
    let [...hexValues] = this.state.hexValues;
    hexValues[targetIndex] = this.rgb2hex(e.value, targetIndex);

    /* Save or delete rgb value to/from local storage */
    if (e.value !== '') {
      localStorage.setItem('rgb-' + targetIndex, e.value);
    } else {
      localStorage.removeItem('rgb-' + targetIndex);
    }

    this.setState({
      rgbValues,
      hexValues,
    });
  };

  rgb2hex = (rgbValue, index) => {
    let rgb = rgbValue.match(/^(\d+),\s*(\d+),\s*(\d+)$/);

    if (rgb) {
      function hex(x) {
        if (x < 0) {
          x = 0;
        }
        if (x > 255) {
          x = 255;
        }

        return ("0" + parseInt(x, 10).toString(16)).slice(-2);
      }

      rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);

      this[`exampleBg${index}`].style.backgroundColor = rgb;
      this[`exampleText${index}`].style.color = rgb;

      return rgb;
    }

    return '';
  };

  changeHex2rgb = (e) => {
    let index = /[\d]/;
    let targetIndex = e.target.id.match(index)[0];

    this[`rgbInput${targetIndex}`].value = '';
    this[`exampleBg${targetIndex}`].style.backgroundColor = 'initial';
    this[`exampleText${targetIndex}`].style.color = 'initial';

    let [...rgbValues] = this.state.rgbValues;
    rgbValues[targetIndex] = this.hex2rgb(e.target.value, targetIndex);
    let [...hexValues] = this.state.hexValues;
    hexValues[targetIndex] = e.target.value;

    /* Save or remove rgb value to/from local storage */
    if (rgbValues[targetIndex] !== '') {
      localStorage.setItem('rgb-' + targetIndex, rgbValues[targetIndex]);
    } else {
      localStorage.removeItem('rgb-' + targetIndex);
    }

    this.setState({
      rgbValues,
      hexValues,
    });
  };

  // https://gist.github.com/Arahnoid/9923989
  hex2rgb = (hex, index) => {
    function hex2rgb(x) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    hex = hex2rgb(hex);

    if (hex) {
      let rgbString = hex.r + ',' + hex.g + ',' + hex.b;

      this[`exampleBg${index}`].style.backgroundColor = 'rgb(' + rgbString + ')';
      this[`exampleText${index}`].style.color = 'rgb(' + rgbString + ')';

      return rgbString;
    }

    return '';
  };

  getRGBa = (color) => {
    let i = 0;
    let item;
    let matchColor = color.replace(/ +/g, '').match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);

    if (matchColor && matchColor.length > 3) {
      while (i < 3) {
        item = matchColor[++i];
        if (item.indexOf('%') !== -1) {
          item = Math.round(parseFloat(item) * 2.55);
        }
        else item = parseInt(item, 10);

        if (item < 0 || item > 255) return NaN;
        matchColor[i] = item;
      }

      if (color.indexOf('rgba') === 0) {
        if (matchColor[4] === undefined || matchColor[4] < 0 || matchColor[4] > 1) return NaN;
      }
      else if (matchColor[4]) return NaN;

      return matchColor[0] + '(' + matchColor.slice(1).join(',') + ')';
    }

    return NaN;
  };

  renderCell = (col) => {
    const inputLabelClasses = classNames('rgb-label', {
      'left-block': fieldsCount > 3,
    });

    const exampleLabelClasses = classNames('rgb-label util-p-t-0', {
      'block': fieldsCount > 3,
    });

    return (
      <div key={`table-col-${col}`} className="wt-grid-col-lg-2 util-p-t-1 util-p-b-2">
        <p className="left util-m-t-0">
          <label className={inputLabelClasses}>RGB{fieldsCount < 4 && ':'}</label>
          <input
            type="text"
            name={`rgbValue-${col}`}
            id={`rgbValue-${col}`}
            value={this.state.rgbValues[col] || ''}
            className="rgbValue"
            onChange={this.changeRgb2hex}
            ref={input => { this[`rgbInput${col}`] = input; }}
          />
        </p>
        <p className="left util-m-t-0">
          <label className={inputLabelClasses}>Hex{fieldsCount < 4 && ':'}</label>
          <input
            name={`hexValue-${col}`}
            id={`hexValue-${col}`}
            value={this.state.hexValues[col] || ''}
            className="hexValue"
            onChange={this.changeHex2rgb}
            ref={input => { this[`hexInput${col}`] = input; }}
          />
        </p>
        <p className="left util-m-y-0">
          <label className={exampleLabelClasses}>Example:</label>
          <input
              id={`example-bg-${col}`}
              className="example-bg"
              readOnly
              ref={input => { this[`exampleBg${col}`] = input; }}
          /> &nbsp; <span
            id={`example-text-${col}`}
            className="example-text"
            ref={text => { this[`exampleText${col}`] = text; }}>Lorem ipsum sample text</span>
        </p>
      </div>
    );
  };

  render() {
    //const columns = Array.from(Array(fieldsCount)).map((e, i) => i + 1); // 1 indexed
    const columns = [...Array(fieldsCount).keys()]; // 0 indexed

    return (
      <React.Fragment>
        <h1>RGB to Hex to RGB</h1>
        <p className="subheader">Fill in either RGB or Hex values</p>

        <div className="wt-grid-row">
          {columns.map(x => this.renderCell(x))}
        </div>

      </React.Fragment>
    );
  }
}

Rgb2Hex.propTypes = {};

export default Rgb2Hex;
