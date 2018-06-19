import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';

import getSlug from 'speakingurl';

class Slug extends PureComponent {
  constructor(props) {
    super(props);

    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.textOutput = React.createRef();
  }

  componentDidMount() {
    this.focusTextInput();
  }

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  };

  stringToSlug = () => {
    let slug = getSlug(this.textInput.current.value);

    slug = slug.replace(/^opt-|^tech-/gi, function (x) {
      return x.toUpperCase();
    });

    this.textOutput.current.value = slug;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Slug</h1>
        <p>The part of an URL which identifies a page using human-readable keywords.
          Input a string of text and slugify it.</p>

        <div className="gap">
          Any ordinary string
          <input size="150" className="inputSlug" ref={this.textInput} onChange={this.stringToSlug} />
        </div>

        <div className="gap">
          Human-readable url slug
          <input size="150" className="inputSlug" readOnly ref={this.textOutput} />
        </div>

        <div className="gap">
          <input type="button" className="buttonSlug" onClick={this.stringToSlug} value="Slugify" />
        </div>
      </React.Fragment>
    );
  }
}

Slug.propTypes = {
};

export default Slug;
