import { observable, action } from "mobx-react";
import { CallApi } from "../../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class loginStore {
  @observable
  values = {
    username: "dima.machulsky@gmail.com",
    password: "password666",
    repeatPassword: "password666",
    errors: {},
    submitButton: false
  };

  @observable
  user = {};

  @observable
  showLoginModal = false;

  @observable
  session_id = "";

  @action
  toggleLoginModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  updateUser = user => {
    this.user = user;
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.session_id = session_id;
  };

  @action
  onSubmit = () => {
    this.values = {
      ...this.values,
      submitButton: true
    };

    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          }
        }).then(data => {
          return CallApi.post("/authentication/session/new", {
            body: {
              request_token: data.request_token
            }
          });
        });
      })
      .then(data => {
        this.updateSessionId(data.session_id);

        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        }).then(user => {
          this.values = {
            ...this.values,
            submitButton: true
          };
          this.updateUser(user);
          this.toggleLoginModal();
        });
      })
      .catch(error => {
        this.values = {
          ...this.values,
          submitButton: true,
          errors: {
            base: error.status_message
          }
        };
      });
  };

  @action
  onLogin = event => {
    event.preventDefault();

    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.values.errors = {
        ...this.errors,
        ...errors,
        submitButton: true
      };
    } else {
      this.onSubmit();
    }
  };

  @action
  onChangeValue = event => {
    let { name, value } = event.target;

    this.values = {
      [name]: value,
      errors: {
        ...this.errors,
        base: null,
        [name]: null
      },
      submitButton: false
    };
  };

  @action
  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.values.errors = {
        errors: {
          ...this.errors,
          ...errors
        }
      };
    }
  };

  @action
  validateFields = () => {
    const errors = {};

    if (this.values.username === "") {
      errors.username = "Username can`t be empty";
    }

    if (this.values.password === "") {
      errors.password = "Password can`t be empty";
    }

    if (this.values.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Passords must be equal";
    }

    return errors;
  };
}
