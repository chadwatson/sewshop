import React from 'react';

import { breakpoints } from 'containers/App/constants';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

const breakpointNames = Object.keys(breakpoints);

function Grid(props) {
  const newProps = Object.assign({}, props);
  newProps.base = newProps.base || 1;

  const className = Object.keys(newProps).reduce((obj, key) => {
    if (breakpointNames.indexOf(key) !== -1) {
      return Object.assign({}, obj, { [`${key}${newProps[key]}`]: true });
    }

    return obj;
  }, { root: true, base: newProps.base });

  return (
    <div className={cx(className)}>
      {newProps.children}
    </div>
  );
}

Grid.propTypes = {
  base: React.PropTypes.number,
  children: React.PropTypes.node,
};

export default Grid;
