import React from "react";
import Field from "./Field";
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  values: userStore.values,
  onChangeValue: userStore.onChangeValue,
  handleBlur: userStore.handleBlur,
  validateFields: userStore.validateFields
}))
@observer
class Authorization extends React.Component {
  state = {
    submitButton: false
  };
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

    const errors = this.props.validateFields();
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

  render() {
    const { values, handleBlur, onChangeValue } = this.props;
    return (
      <form className="form card-body">
        <Field
          id="username"
          labelText="Username"
          type="text"
          placeholder="Enter username"
          name="username"
          value={values.username}
          onChange={onChangeValue}
          error={values.errors.username}
          onBlur={handleBlur}
        />
        <Field
          id="password"
          labelText="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={values.password}
          onChange={onChangeValue}
          error={values.errors.password}
          onBlur={handleBlur}
        />
        <Field
          id="repeat-password"
          labelText="Repeat Password"
          type="password"
          placeholder="Repeat password"
          name="repeatPassword"
          value={values.repeatPassword}
          onChange={onChangeValue}
          error={values.errors.repeatPassword}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={this.onLogin}
          disabled={values.submitButton}
        >
          Submit
        </button>
        {values.errors.base ? (
          <div className="invalid-feedback text-center">
            {values.errors.base}
          </div>
        ) : null}
      </form>
    );
  }
}

export default AppContextHOC(Authorization);
