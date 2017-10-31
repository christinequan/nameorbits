import React, {Component} from 'react';
import * as d3 from 'd3';
import './orbits.min.css';
// import TransitionGroup from 'react-addons-transition-group';
import ReactDOM from 'react-dom';
// https://medium.com/appifycanada/animations-with-reacttransitiongroup-4972ad7da286

class Orbits extends Component{

  constructor(props){
    super(props);
    // this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // this.alpha_array = alphabet.split('');
    // this.alpha_pie = alpha_array.map(d => {'letter':d, 'pie': 1});
    // console.log(this.alpha_pie);
  }

  // drawAlphaClock() {

  // }

  componentDidMount(){
    // SET UP THE ALPHA CLOCK
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alpha_array = alphabet.split('');
    const alpha_pie = alpha_array.map(function(d){return{'letter':d, 'pie': 1}});
    // console.log(this.alpha_pie);

    const svg = d3.select(ReactDOM.findDOMNode(this))
      .append('svg')
      .attr('class','viz')

    const dim = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const radius = Math.min(dim.width, dim.height)/4;
    const g = d3.select('.viz').append('g').attr("transform", "translate(" + dim.width / 2 + "," + dim.height / 2 + ")");

    let pie = d3.pie().sort(null).value(d => d.pie);
    let path = d3.arc().outerRadius(radius - 10).innerRadius(radius - 11);
    let label = d3.arc().outerRadius(radius - 15).innerRadius(radius - 30);

    let arc = g.selectAll('.arc')
               .data(pie(alpha_pie))
               .enter()
               .append('g')
               .attr('class', 'arc');

     console.log('pie', pie(alpha_pie));
     console.log('path', path);

    arc.append('path')
       .attr('d', path)
       .attr('fill', 'darkblue');

    arc.append('text')
       .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
       .attr("dy", "0.35em")
       .text(d => d.data.letter);

  console.log('arc', arc);
  // all of the letter labels
  const getLetterCoords = (letter, arc_ref, count) => {
    letter = letter.toLowerCase();
    const letterangle = 2*Math.PI/26*alphabet.indexOf(letter);
    const offset = Math.PI/26;
    let level = 1
    if (count !== 1) {
      level = 1 + count*0.1;
    }
    console.log('index', alphabet.indexOf(letter));
    const x_coord = Math.cos(letterangle-Math.PI/2 + offset)*radius*level; //-Math.PI/2 because d3 starts at that point with zero
    const y_coord = Math.sin(letterangle-Math.PI/2 + offset)*radius*level;
    console.log(x_coord, y_coord);
    return [x_coord, y_coord];
    // arc_ref.append('circle').attr('transform', 'translate(' + x_coord + ', ' + y_coord + ')');
  }

  const name = "Christine";
  console.log('newname', name);
  const coords = [];

  let counter = {};
  const name_arr = name.toLowerCase().split('');

  for (let i = 0; i < name.length; i++){
    const letter = name_arr[i];

    //counter
    if (counter.hasOwnProperty(letter)) {
      counter[letter] += 1
    } else counter[letter] = 1;

    coords.push(getLetterCoords(letter, arc, counter[letter]));
    console.log(letter, coords[i]);
  }
  //draw the circle
  coords.forEach(function(c){
    arc.append('circle').attr('transform', 'translate(' + c[0] + ', ' + c[1] + ')');
  });
  console.log('coords-before', coords);
  // draw the petal
  coords.push(coords[0]);
  console.log('coords-after', coords);
  for (let i = 0; i < coords.length - 1; i++){
    const dx = coords[i+1][0] - coords[i][0];
    const dy = coords[i+1][1] - coords[i][1];

    const offset = Math.PI/26;
    const a1 = 2*Math.PI/26*alphabet.indexOf(name_arr[i]) -Math.PI/2 + offset;
    const a2 = 2*Math.PI/26*alphabet.indexOf(name_arr[i+1]) -Math.PI/2 + offset;
    const da = (a2-a1)/Math.PI;

    const index1 = alphabet.indexOf(name_arr[i]);
    const index2 = alphabet.indexOf(name_arr[i+1]);
    const diff = index2 - index1;

    let sweepFlag = 1; // (index1 > 20)
    //if( (da > -3/2 && da <= -1) || (da > -1/2 && da <= 0) || (da > 1/2 && da <= 1) || (da > 3/2 && da <= 2) ) {
    // if(index1 > 13) {
    //   sweepFlag = 0;
    // }//if

    let curve = Math.sqrt(dx*dx + dy*dy)*0.3;

    if (diff > 10 || diff < 0) {
      curve = Math.sqrt(dx*dx + dy*dy)*0.53;
    }

    const path = 'M' + coords[i][0] + ',' + coords[i][1] + 'A' + curve + ' ' + curve + ' 0 1 ' + sweepFlag + ' ' + coords[i+1][0] + ',' + coords[i+1][1];
    g.append('g').attr('class', 'petal').append('path').attr('d', path);
  }

  }

  render(){
    return(
    <div className='svg-container'>
    </div>
  )
  }
}

export default Orbits;
