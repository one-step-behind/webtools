import React, { PureComponent } from 'react';

const operators = ['+', '-', '*', '/', '%', '^'];

const localeString = (value) => {
  return value.toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20
  });
};

const calculate = (formula) => {
  try {
    return new Function('return ' + formula)();
  } catch (err) {
    return NaN;
  }
};

const getFormula = (firstValue, sign, secondValue) => {
  if (sign === '^') {
    return Math.pow(firstValue, secondValue);
  }

  if (sign === '%') {
    return (firstValue/100) * secondValue;
  }

  return firstValue + sign + secondValue;
};

class Calculator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstValue: '',
      secondValue: '',
      sum: 0,
      sign: '+'
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.focusTextInput();
  }

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  };

  onChange = (event) => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = (fieldName !== 'sign') ? event.target.value.replace(/[^0-9.,]/g, '') : event.target.value;

    this.setState({
      [fieldName]: fieldValue,
    }, () => {
      this.calculateAndOutput();
    });
  };

  calculateAndOutput = () => {
    if (operators.some(item => this.state.sign === item) && this.state.firstValue && this.state.secondValue) {
      const formula = getFormula(this.state.firstValue, this.state.sign, this.state.secondValue);

      this.setState({
        sum: calculate(formula),
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Instant calculator</h1>
        <p className="subheader">
          Instantly calculates the stuff you typed in
        </p>

        <div className="row">
          <div className="col-lg-6 col-xs-offset-2 util-p-b-1">
            <input type="text" name="firstValue" id="firstValue" className="inputCalc" size="20" maxLength="20" value={this.state.firstValue} ref={this.textInput} onChange={this.onChange} />
            <select name="sign" defaultChecked={this.state.sign} className="signCalc" ref={ref => this.sign = ref} onChange={this.onChange}>
              {
                operators.map((operator, index) => {
                  return (<option key={index} value={`${operator}`}>{operator}</option>);
                })
              }
            </select>
            <input type="text" name="secondValue" id="secondValue" className="inputCalc" size="20" maxLength="20" value={this.state.secondValue} onChange={this.onChange} />
            {' = '}
            <input type="text" value={localeString(this.state.sum)} className="outputCalc" readOnly />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Calculator;
