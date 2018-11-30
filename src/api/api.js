import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "b1b14ba99b5d4d54058f2772975a536e";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWIxNGJhOTliNWQ0ZDU0MDU4ZjI3NzI5NzVhNTM2ZSIsInN1YiI6IjViYjRhOGJmYzNhMzY4N2FlYjAxMTU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KRdS7INw55FxYH6_s3cxWLcqxaPw0KoOnBYyNxlClHw";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => {
        if (res.status < 400) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => resolve(data))
      .catch(res => {
        res.json().then(error => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }

  static delete(url, options = {}) {
    const { body = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "delete",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }
}
