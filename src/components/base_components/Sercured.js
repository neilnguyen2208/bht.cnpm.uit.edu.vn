import React, { Component } from 'react';
import QueryAPI from './QueryAPI';
// import Keycloak from 'keycloak-js';

class Secured extends Component {

  constructor(props) {
    super(props);
    // this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    // const keycloak = Keycloak('/keycloak.json');
    // keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
    //   this.setState({ keycloak: keycloak, authenticated: authenticated })
    //   console.log(this.state.keycloak)
    // })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>
            Authenticated
          </p>
          {/* <QueryAPI keycloak={this.state.keycloak} /> */}
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}

export default Secured;
