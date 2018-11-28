import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Auth from "./Auth";

export default class Login extends React.Component {

  render() {
    const { showLoginModal, toggleLoginModal } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginModal}
        >
          Login
        </button>
        <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
          <ModalBody>
            <Auth />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

/* const result = [];

const father_url = document.querySelector(".js-product-keywords-holder");

const childrens = father_url.querySelectorAll("a");

childrens.forEach(children => {
  result.push(children.innerText);
});

result.join(', ') */
