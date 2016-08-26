import React from 'react';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

function Wrapper({ size = 'default', children }) {
  const classname = cx({
    base: true,
    [`size-${size}`]: true,
  });

  return <div className={classname}>{children}</div>;
}

Wrapper.propTypes = {
  size: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Wrapper;
