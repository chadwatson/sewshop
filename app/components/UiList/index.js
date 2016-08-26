import React from 'react';

function UiList({ className, children }) {
  return (
    <ul
      className={className}
      style={{
        padding: 0,
        margin: 0,
        listStyle: 'none',
      }}
    >{children}</ul>
  );
}

UiList.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default UiList;
