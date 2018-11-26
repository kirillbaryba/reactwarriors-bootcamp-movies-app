import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Auth from "./Auth";

export default class Login extends React.Component {
  // `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
  // `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
  // `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`

  render() {
    const { updateUser, updateSessionId, showModal, toggleModal } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleModal}
        >
          Login
        </button>
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalBody>
            <Auth updateUser={updateUser} updateSessionId={updateSessionId} />
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
