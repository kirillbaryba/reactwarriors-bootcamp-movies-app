import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class Login extends React.Component {
  render() {
    const { toggleLoginModal } = this.props.loginFormStore;

    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginModal}
        >
          Login
        </button>
      </div>
    );
  }
}

export default Login;
