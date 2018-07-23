import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';

import { reactLocalStorage } from 'reactjs-localstorage';

const COOKIE_NAME = 'B64DLIVE';

class Base64Decode extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      liveMode: false,
      inputValue: '',
      outputValue: '',
    };

    this.textInput = React.createRef();
  }

  componentDidMount = () => {
    const cookie = reactLocalStorage.get(COOKIE_NAME);

    if (cookie !== "undefined" && cookie === "on") {
      this.setState({
        liveMode: true,
      });
    }

    this.focusTextInput();
  };

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  };

  toggleLiveMode = () => {
    if (this.state.liveMode) {
      this.liveDisable();
    } else {
      this.liveEnable();
    }
  };

  liveEnable = () => {
    reactLocalStorage.set(COOKIE_NAME, 'on');

    this.setState({
      liveMode: true,
    }, this.parse());
  };

  liveDisable = () => {
    let textOutput = document.querySelector('textarea[name="output"]');

    this.setState({
      liveMode: false,
      outputValue: '',
    });

    textOutput.classList.remove('error');
    reactLocalStorage.set(COOKIE_NAME, 'off');
  };

  liveParse = (e) => {
    let elem;

    if (!e || (e && !e.target)) {
      elem = document.querySelector('textarea[name="input"]');
    } else {
      elem = e.target;
    }

    this.setState({
      inputValue: elem.value
    });

    if (!this.state.liveMode) {
      return null;
    }

    this.parse();
  };

  parse = () => {
    const {
      inputValue,
    } = this.state;

    let textOutput = document.querySelector('textarea[name="output"]');

    let encodedData = inputValue ? inputValue.replace(/\s+/gim, '') : '';
    let decodedData = '';

    try {
      decodedData = this.unicodeBase64Decode(encodedData);
      textOutput.classList.remove('error');
    } catch (error) {
      decodedData = "Malformed input... :(";
      textOutput.classList.add('error');
    }

    this.setState({
      outputValue: decodedData,
    });
  };

  unicodeBase64Decode = (text) => {
    return decodeURIComponent(Array.prototype.map.call(window.atob(text), (c) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  };

  onClick = () => {
    this.parse();
  };

  render() {
    return (
      <React.Fragment>
        <p className="subheader">Put your base64 <strong>encoded</strong> text into the first textarea.</p>

        <div className="row">
          <div className="col-lg-10">
            <textarea
              name="input"
              placeholder="Type (or paste) here..."
              value={this.state.inputValue}
              //onInput={this.liveParse}
              onChange={this.liveParse}
              onKeyUp={this.liveParse}
              //onMouseUp={this.liveParse()}
              ref={this.textInput}
            />
          </div>

          <div className="col-lg-2 col-xs-offset-2">
            <button name="decode" value="decode" className="buttonSlug" onClick={this.onClick}>
              <i className="fa fa-chevron-left" /> DECODE <i className="fa fa-chevron-right" />
            </button>
          </div>

          <div className="col-lg-2">
            <span className="select-wrapper">
              <i className="fa fa-chevron-down" />
              <select name="charset">
                <option value="UTF-8">UTF-8</option>
                <option value="ASCII">ASCII</option>
                <option value="CP1256">CP1256</option>
                <option value="ISO-8859-1">ISO-8859-1</option>
                <option value="ISO-8859-2">ISO-8859-2</option>
                <option value="ISO-8859-6">ISO-8859-6</option>
                <option value="ISO-8859-15">ISO-8859-15</option>
                <option value="Windows-1252">Windows-1252</option>
              </select>
            </span>
            <div>You may also select input charset.</div>
          </div>

          <div className="col-lg-2">
            <div className="live">
              <span className={`toggle${this.state.liveMode ? ' on': ''}`} onClick={this.toggleLiveMode}>
                <i className={`fa fa-toggle-${this.state.liveMode ? 'on on': 'off'}`} />
                {' '}Live mode {this.state.liveMode ? 'ON' : 'OFF'}
              </span>
              <div>Decodes while you type or paste (strict format).</div>
              {/*<div className="note">Note that decoding of binary data (like images, documents, etc.) does not work in live mode.</div>*/}
            </div>
          </div>

          <div className="col-lg-10">
            <textarea
              name="output"
              placeholder="Result goes here..."
              value={this.state.outputValue}
              readOnly
            />
          </div>

          <div className="col-lg-10">
            <div className="wiki">
              <h3><i className="fa fa-question-circle-o" /> Details of the encoding</h3>
              <b>Base64</b><br />
              <br />Base64 is a generic term for a number of similar encoding schemes that encode binary data by treating it
              numerically and translating it into a base 64 representation. The Base64 term originates from a specific MIME
              content transfer encoding.<br />
              <br />Base64 encoding schemes are commonly used when there is a need to encode binary data that needs be
              stored
              and transferred over media that are designed to deal with textual data. This is to ensure that the data
              remains
              intact without modification during transport. Base64 is used commonly in a number of applications including
              email
              via MIME, and storing complex data in XML.<br />
              <br /><b>Design</b><br />
              <br />The particular choice of characters to make up the 64 characters required for base varies between
              implementations. The general rule is to choose a set of 64 characters that is both part of a subset common to
              most
              encodings, and also printable. This combination leaves the data unlikely to be modified in transit through
              systems, such as email, which were traditionally not 8-bit clean. For example, MIME's Base64 implementation
              uses
              A-Z, a-z, and 0-9 for the first 62 values. Other variations, usually derived from Base64, share this property
              but
              differ in the symbols chosen for the last two values; an example is UTF-7.<br />
              <br /><b>Example</b><br />
              <br />A quote snippet from Thomas Hobbes's Leviathan:<br />
              <br />"<i>Man is distinguished, not only by his reason, but ...</i>"<br />
              <br />represented as an ASCII byte sequence is encoded in MIME's Base64 scheme as follows:<br />
              <br />TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCAuLi4=<br />
              <br />In the above quote the encoded value of <i>Man</i> is <i>TWFu</i>. Encoded in
              ASCII, <i>M</i>, <i>a</i>, <i>n</i>
              are stored as the bytes 77, 97, 110, which are 01001101, 01100001, 01101110 in base 2. These three bytes are
              joined together in a 24 bit buffer producing 010011010110000101101110. Packs of 6 bits (6 bits have a maximum
              of
              64 different binary values) are converted into 4 numbers (24 = 4 * 6 bits) which are then converted to their
              corresponding values in Base64.<br />
              <br />
              <table cellPadding="3" cellSpacing="1" border="0">
                <tbody>
                <tr>
                  <th>Text content</th>
                  <td colSpan="8">M</td>
                  <td colSpan="8">a</td>
                  <td colSpan="8">n</td>
                </tr>
                <tr>
                  <th>ASCII</th>
                  <td colSpan="8" align="center">77</td>
                  <td colSpan="8" align="center">97</td>
                  <td colSpan="8" align="center">110</td>
                </tr>
                <tr>
                  <th>Bit pattern</th>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>Index</th>
                  <td colSpan="6">19</td>
                  <td colSpan="6">22</td>
                  <td colSpan="6">5</td>
                  <td colSpan="6">46</td>
                </tr>
                <tr>
                  <th>Base64-encoded</th>
                  <td colSpan="6">T</td>
                  <td colSpan="6">W</td>
                  <td colSpan="6">F</td>
                  <td colSpan="6">u</td>
                </tr>
                </tbody>
              </table>
              <br />As this example illustrates, Base64 encoding converts 3 uncoded bytes (in this case, ASCII characters)
              into
              4 encoded ASCII characters.<br />
              <br />At Wikipedia you can read more about the <a href="http://en.wikipedia.org/wiki/Base64" target="_blank"
                                                                rel="external nofollow noopener noreferrer">encoding</a>.
            </div>
          </div>
        </div>


      </React.Fragment>
    );
  }
}

Base64Decode.defaultProps = {};

Base64Decode.propTypes = {};

export default Base64Decode;
