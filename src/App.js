import React, { PureComponent } from 'react';
// import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import Calculator from './components/Calculator';
import Rgb2Hex from './components/Rgb2Hex';
import Slug from './components/Slug';
import Base64 from './components/Base64';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 'calculator',
    };

    this.onClickNavigation = this.onClickNavigation.bind(this);
  }

  componentDidMount() {
    let lastPage = localStorage.getItem('lastPage');

    if (lastPage) {
      this.setState({
        selectedPage: lastPage,
      });
    }
  }

  onClickNavigation(event) {
    this.setState({
      selectedPage: event.target.dataset.link,
    });

    /* save last called page to local storage */
    localStorage.setItem('lastPage', event.target.dataset.link);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            Webtools
          </h1>
          <Navigation selectedPage={this.state.selectedPage} onClickNavigation={this.onClickNavigation} />
        </header>
        <div className="App-intro">
          { this.state.selectedPage === 'calculator' && <Calculator /> }
          { this.state.selectedPage === 'rgb2hex' && <Rgb2Hex /> }
          { this.state.selectedPage === 'slug' && <Slug /> }
          { this.state.selectedPage === 'base64' && <Base64 /> }
        </div>
      </div>
    );
  }
}

export default App;
