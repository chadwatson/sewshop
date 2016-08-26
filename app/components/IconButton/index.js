import React from 'react';
import Icon from 'components/Icon';
import styles from './index.css';

function IconButton({ width, icon, value, onClick }) {
  return (
    <button
      type="button"
      value={value}
      onClick={onClick}
      className={styles.button}
    >
      <Icon glyph={icon} width={width} className={styles.icon} />
    </button>
  );
}

IconButton.propTypes = {
  width: React.PropTypes.string,
  icon: React.PropTypes.string,
  value: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default IconButton;
