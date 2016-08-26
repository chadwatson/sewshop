import React from 'react';
import styles from './index.css';
import Headline from '../Headline';
import Triangles from '../Triangles';
import FlagFlowers from 'components/FlagFlowers';
import { STYLE_FLOWERS } from 'containers/CustomBannerPage/constants';

const flagWidth = 100;
const flagHeight = 125;

function Flag({
  backgroundColor,
  textColor,
  accents,
  letter,
  style,
}) {
  const AccentShapes = (() => {
    if (style === STYLE_FLOWERS) {
      return (
        <FlagFlowers
          colors={accents}
          position={`translate(35 -${flagWidth / 2})`}
        />
      );
    }

    return <Triangles colors={accents} className={style.accentShape} />;
  })();

  return (
    <div className={styles.flag}>
      <svg
        xmlns="http://www.w3.org/svg/2000"
        viewBox={`0 0 ${flagWidth} ${flagHeight}`}
        className={styles.shape}
        fill={backgroundColor}
      >
        <polygon points={`0 0, 0 ${flagWidth}, ${flagWidth / 2} ${flagHeight}, ${flagWidth} ${flagWidth}, ${flagWidth} 0`}></polygon>
        <text
          x={flagWidth / 2} y="95"
          fontSize="80"
          textAnchor="middle"
          fontFamily={Headline.fontFamily}
          className={styles.letter}
          style={{ fill: textColor }}
        >{letter}</text>
        {AccentShapes}
      </svg>
    </div>
  );
}

Flag.propTypes = {
  backgroundColor: React.PropTypes.string,
  textColor: React.PropTypes.string,
  accents: React.PropTypes.array,
  letter: React.PropTypes.string,
  style: React.PropTypes.string,
};

export default Flag;
