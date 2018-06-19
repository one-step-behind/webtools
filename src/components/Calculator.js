import React, { PureComponent } from 'react';

const operators = ['+', '-', '*', '/', '%', '^'];

class Calculator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstValue: '',
      secondValue: '',
      sum: 0,
      sign: '+'
    };
  }

  onChange = (event) => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = (fieldName !== 'sign') ? event.target.value.replace(/[^0-9.,]/g, '') : event.target.value;

    /*
        this.setState(prevState => {
          if (prevState.firstValue !== '' || prevState.secondValue !== '') {
            return {
              sum: eval(prevState.firstValue + prevState.sign + prevState.secondValue),
              [fieldName]: fieldValue
            }
          }

          return {ieldName]: fieldValue };
        });
    */

    this.setState({
      [fieldName]: fieldValue,
    }, () => {
      this.calculateAndOutput();
    });
  };

  localeString(value) {
    return value.toLocaleString('en', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    });
  }

  calculate(formula) {
    try {
      return new Function('return ' + formula)();
    } catch (err) {
      return NaN;
    }
  }

  getFormula(firstValue, sign, secondValue) {
    if (sign === '^') {
      return Math.pow(this.state.firstValue, this.state.secondValue);
    }

    if (sign === '%') {
      return (this.state.firstValue/100) * this.state.secondValue;
    }

    return this.state.firstValue + sign + this.state.secondValue;
  }

  calculateAndOutput = () => {
    const sign = this.state.sign;

    if (operators.some(item => sign === item) && this.state.firstValue && this.state.secondValue) {
      const formula = this.getFormula(this.state.firstValue, sign, this.state.secondValue);

      this.setState({
        sum: this.calculate(formula),
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Instant calculator</h1>

        <div className="gap">
          <input type="text" name="firstValue" id="firstValue" className="inputCalc" size="20" maxLength="20" value={this.state.firstValue} onChange={this.onChange} />
          <select name="sign" defaultChecked={this.state.sign} className="signCalc" ref={ref => this.sign = ref} onChange={this.onChange}>
            {
              operators.map((operator, index) => {
                return (<option key={index} value={`${operator}`}>{operator}</option>);
              })
            }
          </select>
          <input type="text" name="secondValue" id="secondValue" className="inputCalc" size="20" maxLength="20" value={this.state.secondValue} onChange={this.onChange} />
        </div>

        <div className="outputCalc gap">{this.localeString(this.state.sum)}</div>
      </React.Fragment>
    );
  }
}

export default Calculator;
