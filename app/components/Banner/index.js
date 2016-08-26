import React from 'react';
import reactImmutableProptypes from 'react-immutable-proptypes';

import Flag from 'components/Flag';
import { height } from './constants';
import styles from './index.css';

function Banner({ text, colors, style }) {
  return (
    <div className={styles.banner} style={{ height }}>
      {` ${text} `.split('').map((letter, i) => (
        <Flag
          letter={letter}
          backgroundColor={colors.get('background')}
          textColor={colors.get('text')}
          accents={colors.get('accents').toArray()}
          style={style}
          key={i}
        />
      ))}
    </div>
  );
}

Banner.propTypes = {
  text: React.PropTypes.string,
  colors: reactImmutableProptypes.map,
  style: React.PropTypes.string,
};

export default Banner;
