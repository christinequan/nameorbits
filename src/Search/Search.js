import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.min.css';

class Search extends Component{

  focusCallback = (event) => {
    event.preventDefault();
    event.currentTarget.placeholder = '';
  }

  submitCallback = (event) => {
    event.preventDefault();
    this.props.onChanged(event.currentTarget.name.value);
  }

  render(){
    return (
      <form className='Search' onSubmit={this.submitCallback}>
        <input type="text" name='name' className="query-input" placeholder = "magic" onFocus={this.focusCallback}/>
        <input type="submit" className="submit" value="Search" />
        {/* <button className="clear" type="button"> Clear </button> */}
      </form>
    )
  }
}

Search.propTypes = {
  onChanged: PropTypes.func.isRequired
}

export default Search;
