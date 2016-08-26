import React from 'react';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

function VisuallyHidden({ active = true, children }) {
  return (
    <span className={cx({ active })}>{children}</span>
  );
}

VisuallyHidden.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default VisuallyHidden;
