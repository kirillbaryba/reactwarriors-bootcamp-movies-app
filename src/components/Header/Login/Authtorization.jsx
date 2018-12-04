import React from "react";
import Field from "./Field";
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";

class Authorization extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "dima.machulsky@gmail.com",
      password: "password666",
      repeatPassword: "password666",
      errors: {},
      submitButton: false
    };
  }

  onSubmit = () => {
    const { toggleLoginModal } = this.props;
    this.setState({
      submitButton: true
    });

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
        this.props.updateSessionId(data.session_id);

        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        }).then(user => {
          this.setState({
            submitButton: true
          });
          this.props.updateUser(user);
          toggleLoginModal();          
        });
      })
      .catch(error => {
        console.log(error, "error");
        this.setState({
          submitButton: true,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onLogin = e => {
    e.preventDefault();

    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        },
        submitButton: true
      }));
    } else {
      this.onSubmit();
    }
  };

  onChangeValue = e => {
    let { name, value } = e.target;

    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      },
      submitButton: false
    }));
  };

  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Username can`t be empty";
    }

    if (this.state.password === "") {
      errors.password = "Password can`t be empty";
    }

    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Passords must be equal";
    }

    return errors;
  };

  render() {
    return (
      <form className="form card-body">
        <Field
          id="username"
          labelText="Username"
          type="text"
          placeholder="Enter username"
          name="username"
          value={this.state.username}
          onChange={this.onChangeValue}
          error={this.state.errors.username}
          onBlur={this.handleBlur}
        />
        <Field
          id="password"
          labelText="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={this.state.password}
          onChange={this.onChangeValue}
          error={this.state.errors.password}
          onBlur={this.handleBlur}
        />
        <Field
          id="repeat-password"
          labelText="Repeat Password"
          type="password"
          placeholder="Repeat password"
          name="repeatPassword"
          value={this.state.repeatPassword}
          onChange={this.onChangeValue}
          error={this.state.errors.repeatPassword}
          onBlur={this.handleBlur}
        />
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={this.onLogin}
          disabled={this.state.submitButton}
        >
          Submit
        </button>
        {this.state.errors.base ? (
          <div className="invalid-feedback text-center">
            {this.state.errors.base}
          </div>
        ) : null}
      </form>
    );
  }
}

export default AppContextHOC(Authorization);
