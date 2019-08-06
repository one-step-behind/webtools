import React, { PureComponent } from 'react';
import getSlug from 'speakingurl';

const upperCaseStrings = [
  '^opt-',
  '^tech-',
  '^or-',
];

class Slug extends PureComponent {
  constructor(props) {
    super(props);

    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.textOutput = React.createRef();
  }

  componentDidMount = () => {
    this.focusTextInput();
  };

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  };

  onOutputFocus = (e) => {
    e.target.select();
  };

  stringToSlug = () => {
    let slug = getSlug(this.textInput.current.value, {
      lang: false,
    });

    let upperCase = new RegExp(upperCaseStrings.join('|'), 'gi');

    slug = slug.replace(upperCase, x => x.toUpperCase());

    this.textOutput.current.value = slug;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Slug</h1>
        <p className="subheader">
          The part of an URL which identifies a page using human-readable keywords.
          Input a string of text and slugify it.
        </p>

        <div className="row">
          <div className="col-lg-10 util-p-t-1 util-p-b-1">
            <div className="left">Any ordinary string</div>
            <input size="150" className="inputSlug" ref={this.textInput} onChange={this.stringToSlug} />
          </div>

          <div className="col-lg-10 util-p-t-1 util-p-b-1">
            <div className="left">Human-readable url slug</div>
            <input size="150" className="inputSlug" readOnly ref={this.textOutput} onFocus={this.onOutputFocus} />
          </div>

          <div className="col-lg-2 col-lg-offset-4 util-p-t-1 util-p-b-1">
            <input type="button" className="buttonSlug" onClick={this.stringToSlug} value="Slugify" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Slug;
