import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.min.css';
import Orbits from './Orbits/orbits';
import Search from './Search/Search';
import TitleBox from './Header/Title';

class App extends Component {
  state = {
    name: ''
  }

  searchCallBack = (new_name) => {
    this.setState({name: new_name});
    console.log('name', new_name);
  }

  render() {
    const name = this.state.name;
    return (
      <div className="App">
        <TitleBox />
        <Search onChanged={this.searchCallBack}/>
        <Orbits name={name}></Orbits>
      </div>
    );
  }
}

export default App;
