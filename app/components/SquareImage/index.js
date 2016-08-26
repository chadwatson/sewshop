import React from 'react';
import VisuallyHidden from 'components/VisuallyHidden';

function SquareImage({
  image,
  className,
  children,
  alt,
  useFallback = true,
}) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: 0,
        paddingTop: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${image})`,
      }}
    >
      {useFallback ? (
        <VisuallyHidden>
          <img src={image} alt={alt} />
        </VisuallyHidden>
      ) : null}
      {children}
    </div>
  );
}

SquareImage.propTypes = {
  image: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  useFallback: React.PropTypes.bool,
};

export default SquareImage;
