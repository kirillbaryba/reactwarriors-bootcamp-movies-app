import { observable, action, computed, configure } from "mobx";
import Cookies from "universal-cookie";
import CallApi from "../api/api";

const cookies = new Cookies();

configure({ enforceActions: "always" });

class UserStore {
  @observable user = {};

  @observable session_id = null;

  @computed get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

  @action
  resetUserInfo = () => {
    cookies.remove("session_id", { path: "/" });
    this.user = {};
    this.session_id = null;
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.session_id
      }
    });
  };

  @action
  updateAuth = ({ session_id, user }) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });

    this.session_id = session_id;
    this.user = user;
  };

  @action
  getUser = () => {
    const session_id = cookies.get("session_id");

    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      }).then(user => {
        this.updateAuth({ session_id, user });
      });
    }
  };
}
export const userStore = new UserStore();
