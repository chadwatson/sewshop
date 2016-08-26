import React from 'react';
import { Link } from 'react-router';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

function Button({
  size = 'normal',
  variant = 'default',
  type = 'button',
  stylesOnly = false,
  linkTo = null,
  disabled = false,
  onClick,
  title,
  style,
  children,
}) {
  const className = cx({
    base: true,
    normal: size === 'normal',
    small: size === 'small',
    large: size === 'large',
    default: variant === 'default',
    important: variant === 'important',
    cool: variant === 'cool',
    dull: variant === 'dull',
    dark: variant === 'dark',
    inactive: variant === 'inactive',
    disabled,
  });

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        onClick={onClick}
        className={className}
        title={title}
        style={style}
      >{children}</Link>
    );
  } if (stylesOnly) {
    return (
      <span
        className={className}
        style={style}
      >{children}</span>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      title={title}
      style={style}
      disabled={disabled}
    >{children}</button>
  );
}

Button.propTypes = {
  size: React.PropTypes.string,
  variant: React.PropTypes.string,
  type: React.PropTypes.string,
  stylesOnly: React.PropTypes.bool,
  linkTo: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  title: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default Button;
