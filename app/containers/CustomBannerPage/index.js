import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import reactImmutableProptypes from 'react-immutable-proptypes';

import { ID } from './constants';
import { zIndexes } from 'containers/App/constants';
import { toggleDrawer } from 'containers/App/actions';
import { selectDrawerActive } from 'containers/App/selectors';
import { selectProductItemById } from 'containers/Products/selectors';
import { height as bannerHeight } from 'components/Banner/constants';
import { infoShown } from './actions';
import {
  selectInfoShown,
  selectText,
  selectColors,
  selectStyle,
} from './selectors';

import RichText from 'components/RichText';
import Gallery from 'components/Gallery';
import Button from 'components/Button';
import Banner from 'components/Banner';
import CloseButton from 'components/CloseButton';
import InfoButton from 'components/InfoButton';
import BannerForm from 'containers/BannerForm';

import styles from './index.css';

class CustomBannerPage extends React.Component {

  static propTypes = {
    text: React.PropTypes.string,
    style: React.PropTypes.string,
    colors: React.PropTypes.object,
    info: reactImmutableProptypes.map,
    infoShown: React.PropTypes.bool,
    drawerActive: React.PropTypes.bool,
    setInfoShown: React.PropTypes.func,
    toggleDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      modalOpen: !props.infoShown,
      infoShown: props.infoShown,
    };
  }

  componentDidMount() {
    if (!this.state.infoShown) {
      this.props.setInfoShown();
    }

    if (this.props.drawerActive) {
      this.props.toggleDrawer();
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    const { text, colors, style, info } = this.props;
    const { modalOpen } = this.state;

    return (
      <div className={styles.root}>
        <div
          className={styles.bannerContainer}
          style={{ height: bannerHeight }}
        >
          <Banner text={text} colors={colors} style={style} />
        </div>
        <BannerForm />
        <Modal
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          style={{
            overlay: {
              zIndex: zIndexes.modal,
            },
            content: {
              maxWidth: '768px',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '40px',
            },
          }}
        >
          <RichText>
            <h1>{info.get('title')}</h1>
            <div className={styles.modalInfo}>
              <div className={styles.modalGallery}>
                <Gallery slides={info.get('images')} />
              </div>
              <div className={styles.modalDescription}>
                <div dangerouslySetInnerHTML={{ __html: info.get('description') }} />
                <div className={styles.modalButton}>
                  <Button onClick={this.closeModal}>Let's go!</Button>
                </div>
              </div>
            </div>
            <div className={styles.modalClose}>
              <CloseButton onClick={this.closeModal} />
            </div>
          </RichText>
        </Modal>
        {!modalOpen ? (
          <div className={styles.infoButton}>
            <InfoButton onClick={this.openModal} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = () => {
  const getInfo = selectProductItemById();
  const getInfoShown = selectInfoShown();
  const getDrawerActive = selectDrawerActive();
  const getText = selectText();
  const getStyle = selectStyle();
  const getColors = selectColors();

  return (state) => ({
    info: getInfo(state, ID),
    infoShown: getInfoShown(state),
    drawerActive: getDrawerActive(state),
    text: getText(state),
    style: getStyle(state),
    colors: getColors(state),
  });
};

const mapDispatchToProps = dispatch => ({
  setInfoShown: e => dispatch(infoShown(e)),
  toggleDrawer: e => dispatch(toggleDrawer(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomBannerPage);
