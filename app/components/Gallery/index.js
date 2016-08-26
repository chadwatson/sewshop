import React from 'react';
import reactImmutableProptypes from 'react-immutable-proptypes';

import UiList from 'components/UiList';
import SquareImage from 'components/SquareImage';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    const { slides, thumbnails } = props;
    this.state = {
      current: 0,
      thumbnails: thumbnails || true,
      slides,
    };

    this.handleThumbClick = this.handleThumbClick.bind(this);
  }

  handleThumbClick(e) {
    const { value } = e.target;
    const { current } = this.state;

    if (current !== parseInt(value, 10)) {
      this.setState({
        current: parseInt(value, 10),
      });
    }
  }

  render() {
    const { current, slides, thumbnails } = this.state;
    const slide = slides.get(current);

    let thumbs;
    if (thumbnails && slides.size > 1) {
      thumbs = (
        <UiList className={styles.thumbs}>
          {slides.map((item, i) => (
            <li
              className={cx({
                thumb: true,
                isActive: current === i,
              })}
              key={i}
            >
              <SquareImage image={item}>
                <button
                  type="button"
                  onClick={this.handleThumbClick}
                  className={styles.thumbButton}
                  value={i}
                ></button>
              </SquareImage>
            </li>
          ))}
        </UiList>
      );
    }

    return (
      <div className={styles.root}>
        <SquareImage className={styles.slide} image={slide} />
        {thumbs}
      </div>
    );
  }
}

Gallery.propTypes = {
  current: React.PropTypes.number,
  slides: reactImmutableProptypes.list,
  thumbnails: React.PropTypes.bool,
};

export default Gallery;
