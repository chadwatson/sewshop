import React, { Component } from 'react';

import { zIndexes } from 'containers/App/constants';

import Modal from 'react-modal';
import Button from 'components/Button';

import styles from './index.css';

class ConfirmModal extends Component {
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);

    this.state = {
      active: props.active || true,
    };
  }

  confirm() {
    const { onConfirm, confirmVal } = this.props;
    onConfirm(confirmVal);

    this.setState({ active: false });
  }

  cancel() {
    const { onCancel, cancelVal } = this.props;
    onCancel(cancelVal);

    this.setState({ active: false });
  }

  render() {
    const { message, cancelVal, confirmVal } = this.props;
    const { active } = this.state;

    return (
      <Modal
        isOpen={active}
        onRequestClose={this.cancel}
        style={{
          overlay: {
            zIndex: zIndexes.modal,
          },
          content: {
            width: 'auto',
            maxWidth: '450px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '40px',
            textAlign: 'center',
            zIndex: zIndexes.modal,
          },
        }}
      >
        <div className={styles.message}>{message}</div>
        <Button
          onClick={this.cancel}
          variant="inactive"
          size="small"
          style={{ marginRight: '10px' }}
        >{cancelVal}</Button>
        <Button
          onClick={this.confirm}
          variant="default"
          size="small"
        >{confirmVal}</Button>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  active: React.PropTypes.bool,
  message: React.PropTypes.string,
  cancelVal: React.PropTypes.string,
  confirmVal: React.PropTypes.string,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default ConfirmModal;
