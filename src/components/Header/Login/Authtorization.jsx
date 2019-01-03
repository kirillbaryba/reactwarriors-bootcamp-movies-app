import React from "react";
import Field from "./Field";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class Authorization extends React.Component {
  onLogin = event => {
    event.preventDefault();

    const errors = this.props.loginFormStore.validateFields();
    if (Object.keys(errors).length > 0) {
      this.props.loginFormStore.updateErrors(errors);
    } else {
      this.props.loginFormStore.onSubmit();
    }
  };

  render() {
    const {
      username,
      handleBlur,
      onChangeValue,
      errors,
      password,
      repeatPassword,
      submitButton
    } = this.props.loginFormStore;
    return (
      <form className="form card-body">
        <Field
          id="username"
          labelText="Username"
          type="text"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={onChangeValue}
          error={errors.username}
          onBlur={handleBlur}
        />
        <Field
          id="password"
          labelText="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={onChangeValue}
          error={errors.password}
          onBlur={handleBlur}
        />
        <Field
          id="repeat-password"
          labelText="Repeat Password"
          type="password"
          placeholder="Repeat password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={onChangeValue}
          error={errors.repeatPassword}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={this.onLogin}
          disabled={submitButton}
        >
          Submit
        </button>
        {this.props.loginFormStore.errors.base ? (
          <div className="invalid-feedback text-center">
            {this.props.loginFormStore.errors.base}
          </div>
        ) : null}
      </form>
    );
  }
}

export default AppContextHOC(Authorization);
