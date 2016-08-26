import React from 'react';
import styles from './index.css';

function NakedInput({ children }) {
  return (
    <div className={styles.wrap}>{children}</div>
  );
}

NakedInput.propTypes = {
  children: React.PropTypes.node,
};

export default NakedInput;
