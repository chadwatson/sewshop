import React from 'react';
import styles from './index.css';

function RichText({ children }) {
  return (
    <div className={styles.root}>{children}</div>
  );
}

RichText.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default RichText;
