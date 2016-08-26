import React from 'react';
import styles from './index.css';

const QuantityPicker = ({
  onIncrement,
  onDecrement,
  onManualChange,
  quantity,
}) => (
  <div className={styles.root}>
    <button
      type="button"
      className={styles.button}
      onClick={onDecrement}
    >-</button>
    <input
      type="number"
      step="1"
      className={styles.input}
      value={quantity}
      onChange={onManualChange}
    />
    <button
      type="button"
      className={styles.button}
      onClick={onIncrement}
    >+</button>
  </div>
);

QuantityPicker.propTypes = {
  onIncrement: React.PropTypes.func,
  onDecrement: React.PropTypes.func,
  onManualChange: React.PropTypes.func,
  quantity: React.PropTypes.number,
};

export default QuantityPicker;
