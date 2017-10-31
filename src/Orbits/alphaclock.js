import React, {Component} from 'react';
import * as d3 from 'd3';

class AlphaClock extends Component{
  constructor(props){
    super(props);
    const alpha_array = this.props.alphabet.split('');
    this.alpha_pie = alpha_array.map(function(d){return{'letter':d, 'pie': 1}});
  }

  render(){
    let pie = d3.pie().sort(null).value(d => d.pie);
    let label = d3.arc().outerRadius(this.props.radius - 10).innerRadius(this.props.radius - 20);

    return(
    <g className='alphaclock arc'>
      <circle className='clockcircle' r={this.props.radius + 'px'}/>
      {pie(this.alpha_pie).map(function(d){
        const [dx, dy] = label.centroid(d);
        const style = {
          transform: 'translate(' + dx + 'px, ' + dy +'px)'
        }
        return(<text dy='0.35em' style={style} key={d.data.letter}>{d.data.letter}</text>)
      })}
    </g>
    )
  }

}

export default AlphaClock;
