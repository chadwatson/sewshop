import React, { Component } from 'react';
import shuffle from 'array-shuffle';

import Flower from 'components/Flower';

class FlagFlowers extends Component {
  constructor(props) {
    super(props);

    this.FLOWER_SIZE = 32;
    this.FLOWER_POSITIONS = [
      { x: this.FLOWER_SIZE * -1, y: 0 },
      { x: this.FLOWER_SIZE, y: 0 },
      { x: 0, y: 0 },
    ];
  }

  shouldComponentUpdate(nextProps) {
    return !Object.is(nextProps.colors, this.props.colors);
  }

  render() {
    const { colors, position } = this.props;

    return (
      <g transform={position}>
        {shuffle(colors).slice(0, 3).map((color, i) => (
          <Flower
            color={color}
            key={i}
            width={this.FLOWER_SIZE}
            x={this.FLOWER_POSITIONS[i].x}
            y={this.FLOWER_POSITIONS[i].y}
          />
        ))}
      </g>
    );
  }
}

FlagFlowers.propTypes = {
  colors: React.PropTypes.array,
  position: React.PropTypes.string,
};

export default FlagFlowers;
