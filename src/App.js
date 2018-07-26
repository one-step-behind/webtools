import React, { PureComponent } from 'react';
// import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import Calculator from './components/Calculator';
import Rgb2Hex from './components/Rgb2Hex';
import Slug from './components/Slug';
import Base64 from './components/Base64';
import Casing from './components/Casing';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 'calculator',
      selectedSubPage: 'decode'
    };

    this.onClickNavigation = this.onClickNavigation.bind(this);
    this.onClickSubNavigation = this.onClickSubNavigation.bind(this);
  }

  componentDidMount() {
    let lastPage = localStorage.getItem('lastPage');
    let lastSubPage = localStorage.getItem('lastSubPage');

    if (lastPage) {
      this.setState({
        selectedPage: lastPage,
        selectedSubPage: lastSubPage,
      });
    }
  }

  onClickNavigation(event) {
    const lastPage = event.target.dataset.link;

    this.setState({
      selectedPage: lastPage,
    });

    /* save last called page to local storage */
    localStorage.setItem('lastPage', lastPage);
  }

  onClickSubNavigation(event) {
    const lastSubPage = event.target.dataset.link;

    this.setState({
      selectedSubPage: lastSubPage,
    });

    /* save last called page to local storage */
    localStorage.setItem('lastSubPage', lastSubPage);
  }

  render() {
    const {
      selectedPage,
      selectedSubPage,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            Webtools
          </h1>

          <Navigation
            selectedPage={selectedPage}
            onClickNavigation={this.onClickNavigation}
          />
        </header>
        <div className="App-intro">
          { selectedPage === 'calculator' && <Calculator /> }
          { selectedPage === 'rgb2hex' && <Rgb2Hex /> }
          { selectedPage === 'slug' && <Slug /> }
          { selectedPage === 'casing' && <Casing /> }
          {
            selectedPage === 'base64' &&
            <Base64
              selectedPage={selectedPage}
              selectedSubPage={selectedSubPage}
              onClickSubNavigation={this.onClickSubNavigation}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
