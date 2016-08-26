import React from 'react';
import { fontFamily } from './constants';

let styles = {
  textTransform: 'uppercase',
  fontWeight: 'normal',
  fontFamily,
};

function Headline({ fontSize, children }) {
  if (fontSize) {
    styles.fontSize = fontSize;
  }

  return (
    <span style={styles}>{children}</span>
  );
}

Headline.propTypes = {
  fontSize: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Headline;
