import React, { PureComponent } from 'react';
import Home from './components/home';
import "antd/dist/antd.css";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
