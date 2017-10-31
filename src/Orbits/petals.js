import React, {Component} from 'react';
// import * as d3 from 'd3';

class Petals extends Component{

  componentDidMount(){
    this.calcCoordsArr(this.props.name);
  }

  componentWillReceiveProps(){
    this.calcCoordsArr(this.props.name);
  }

  // takes a name and returns an array of coordinates
  calcCoordsArr(name = ''){
    const coords = [];

    let counter = {};
    const name_arr = name.toLowerCase().split('');

    for (let i = 0; i < name.length; i++){
      const letter = name_arr[i];

      //counter
      if (counter.hasOwnProperty(letter)) {
        counter[letter] += 1
      } else counter[letter] = 1;

      coords.push(this.getLetterCoords(letter, counter[letter]));
    }
    return coords;
  }

  // takes a letter and returns x,y coordinates
  getLetterCoords = (letter, count) => {
    letter = letter.toLowerCase();
    const letterangle = 2*Math.PI/26*this.props.alphabet.indexOf(letter);
    const offset = Math.PI/26;
    let level = 1
    if (count !== 1) {
      level = 1 + count*0.1; // 0.1 is the step function
    }
    // console.log('index', this.props.alphabet.indexOf(letter));
    const radius = this.props.radius + 10; // 10 is the radius offset
    const x_coord = Math.cos(letterangle-Math.PI/2 + offset)*radius*level; //-Math.PI/2 because d3 starts at that point with zero
    const y_coord = Math.sin(letterangle-Math.PI/2 + offset)*radius*level;
    return [x_coord, y_coord];
    // arc_ref.append('circle').attr('transform', 'translate(' + x_coord + ', ' + y_coord + ')');
  }

  calcPetalPaths(coords, name){
      coords.push(coords[0]);
      const name_arr = name.toLowerCase().split('');
      const petalpaths = [];

      for (let i = 0; i < coords.length - 1; i++){
        const dx = coords[i+1][0] - coords[i][0];
        const dy = coords[i+1][1] - coords[i][1];

        const index1 = this.props.alphabet.indexOf(name_arr[i]);
        const index2 = this.props.alphabet.indexOf(name_arr[i+1]);
        const diff = index2 - index1;

        const sweepFlag = 1;

        let curve = Math.sqrt(dx*dx + dy*dy)*0.3;

        if (diff > 10 || diff < 0) {
          curve = Math.sqrt(dx*dx + dy*dy)*0.53;
        }

        const path = 'M' + coords[i][0] + ',' + coords[i][1] + 'A' + curve + ' ' + curve + ' 0 1 ' + sweepFlag + ' ' + coords[i+1][0] + ',' + coords[i+1][1];
        petalpaths.push(path);
      }
      return petalpaths;
  }

  render(){
    const name = this.props.name;
    const circle_coords = this.calcCoordsArr(name);
    const petal_paths = this.calcPetalPaths(circle_coords, name);

    return( //separate into two sections because of single jsx return rule
      <g className='petal'>

        {this.props.name !== "" && petal_paths.map(function(d, i){
          const path = petal_paths;
          return(<path d={path} key={i}></path>)
        })}

        {this.props.name !== "" && circle_coords.map(function(d, i){
          const transform = {transform: 'translate(' + d[0] + 'px,' + d[1] + 'px)'};
          return(<circle style={transform} className='dots' key={i}></circle>)
        })}


    </g>
    )
  }
}

export default Petals;
