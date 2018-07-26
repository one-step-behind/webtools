import React, { PureComponent } from 'react';
import changeCase from 'change-case';

const availableCases = Object.getOwnPropertyNames(changeCase).filter(p => {
  return typeof changeCase[p] === 'function' && p.includes('Case') && !p.startsWith('is');
});

class Casing extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.textInput = React.createRef();

    availableCases.map(aCase => (
      this[aCase] = React.createRef()
    ));
  }

  componentDidMount = () => {
    this.focusTextInput();
  };

  focusTextInput = () => {
    this.textInput.current.focus();
  };

  convert = (elem) => {
    const inputValue = elem.target.value;
    let outputValues = [];

    availableCases.map(aCase => {
      return outputValues[aCase] = changeCase[aCase](inputValue)
    });

    this.setState({
      inputValue: inputValue,
      outputValues
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Casing</h1>
        <p className="subheader">
          Convert text into different cases
        </p>

        <div className="row">
          <div className="col-lg-10">
            <textarea
              name="input"
              placeholder="Type (or paste) here..."
              value={this.state.inputValue}
              onChange={this.convert}
              onKeyUp={this.convert}
              ref={this.textInput}
            />
          </div>

          {
            availableCases.map(aCase => (
              <div className="col-lg-10" key={`outputContainer-${aCase}`}>
                <h3>Output of {aCase}</h3>
                <textarea
                  name={`output-${aCase}`}
                  placeholder={`Output of ${aCase}`}
                  value={this.state.outputValues && this.state.outputValues[aCase]}
                  readOnly
                  ref={this[`output-${aCase}`]}
                />
              </div>
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Casing;
