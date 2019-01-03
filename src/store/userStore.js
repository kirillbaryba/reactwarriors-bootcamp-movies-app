import { observable, action } from "mobx";

export default class userStore {
  @observable
  values = {
    username: "dima.machulsky@gmail.com",
    password: "password666",
    repeatPassword: "password666",
    errors: {},
    submitButton: false
  };

  @action
  onChangeValue = e => {
    let { name, value } = e.target;

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
  handleBlur = e => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.values = {
        errors: {
          ...errors,
          [e.target.name]: ""
        }
      };
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.values.username === "") {
      errors.username = "Username can`t be empty";
    }

    if (this.values.password === "") {
      errors.password = "Password can`t be empty";
    }

    if (this.values.repeatPassword !== this.values.password) {
      errors.repeatPassword = "Passords must be equal";
    }

    return errors;
  };
}
