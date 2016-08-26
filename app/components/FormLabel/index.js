import React from 'react';
import classnames from 'classnames/bind';
import styles from './index.css';

const cx = classnames.bind(styles);

function FormLabel({
  isActive,
  htmlFor,
  animatedText = true,
  showAnimatedText = false,
  children,
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cx({
        label: true,
        isActive,
        showAnimatedText,
      })}
    >
      <span className={cx({ text: true, animatedText })}>{children}</span>
    </label>
  );
}

FormLabel.propTypes = {
  htmlFor: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  animatedText: React.PropTypes.bool,
  showAnimatedText: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default FormLabel;
