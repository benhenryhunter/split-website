class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

  static storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    if(user.type == "host"){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/host/'+user.mongoId);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          localStorage.setItem('host', JSON.stringify(xhr.response.host));
          window.location = "/"
        } else {
          console.log("error");
        }
      });
      xhr.send();
    } else {
      window.location = "/";
    }
  }

}

export default Auth;