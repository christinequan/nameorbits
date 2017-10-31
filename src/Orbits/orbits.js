import React, {Component} from 'react';
// import * as d3 from 'd3';
import AlphaClock from './alphaclock';
import Petals from './petals'
import './orbits.min.css';
// import TransitionGroup from 'react-addons-transition-group';
import ReactDOM from 'react-dom';
// https://medium.com/appifycanada/animations-with-reacttransitiongroup-4972ad7da286

class Orbits extends Component{
  state = {
    width: 0,
    height: 0,
    radius: 0
  }



  constructor(props){
    super(props);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
  }


  componentDidMount(){

    const dim = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const radius = Math.min(dim.width, dim.height)/4;
    this.setState({width: dim.width, height: dim.height, radius: radius})

}

  render(){
    const g_styles = {
      transform: "translate(" + this.state.width / 2 + "px," + this.state.height / 2 + "px)"
    }

    // ref={(input) => { textInput = input; }}
    return(
    <div className='svg-container' >
      <svg className='viz'>
        <g style={g_styles}>
            <AlphaClock alphabet={this.alphabet} radius={this.state.radius}/>
            <Petals alphabet={this.alphabet} name={this.props.name} radius={this.state.radius}/>
        </g>
      </svg>
    </div>
  )
  }
}

export default Orbits;
