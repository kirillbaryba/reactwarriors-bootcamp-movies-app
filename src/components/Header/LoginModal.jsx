import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Authtorization from "../Header/Login/Authtorization";

export default class LoginModal extends React.Component {
  render() {
    const { showLoginModal, toggleLoginModal } = this.props;
    return (
      <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
        <ModalBody>
          <Authtorization toggleLoginModal={toggleLoginModal} />
        </ModalBody>
      </Modal>
    );
  }
}
