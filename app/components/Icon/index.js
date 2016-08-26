import React from 'react';

function Icon({
  glyph,
  width = 16,
  height = 16,
  className = 'icon',
}) {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={glyph} />
    </svg>
  );
}

Icon.propTypes = {
  glyph: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  className: React.PropTypes.string,
};

export default Icon;
