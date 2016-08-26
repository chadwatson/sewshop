import React from 'react';
import arrayShuffle from 'array-shuffle';

class Triangles extends React.Component {

  static propTypes = {
    colors: React.PropTypes.array,
    amount: React.PropTypes.number,
    direction: React.PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return !Object.is(nextProps.colors, this.props.colors);
  }

  render() {
    let { colors } = this.props;

    const {
      amount = colors.length,
      direction = 'down',
    } = this.props;

    const size = 100 / amount;

    let triangles = [];
    for (let i = 0; i < amount; i++) {
      const x1 = i * size;
      const x2 = x1 + (size / 2);
      const x3 = x1 + size;
      const y1 = direction === 'down' ? 0 : size;
      const y2 = direction === 'down' ? size : 0;
      const y3 = direction === 'down' ? 0 : size;

      const loopPosition = i % colors.length;
      if (loopPosition === 0) {
        colors = arrayShuffle(colors);
      }

      triangles.push((
        <polygon
          points={`${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`}
          fill={colors[loopPosition]}
          key={i}
        ></polygon>
      ));
    }

    return (
      <g>
        {triangles}
      </g>
    );
  }
}

export default Triangles;
