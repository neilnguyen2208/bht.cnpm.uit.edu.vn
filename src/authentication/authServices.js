import Keycloak from "keycloak-js";

const _kc = new Keycloak('/keycloak.config.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then((authenticated) => {
            // if (authenticated) {
            onAuthenticatedCallback();
            if (_kc.token) {
                // console.log("Token expire at: ", Math.round(new Date().getTime() / 1000) - _kc.tokenParsed.exp);
                // console.log(_kc.token);
                // console.log("Refresh token expire at: ", Math.round(new Date().getTime() / 1000) - _kc.refreshTokenParsed.exp);
                // console.log("User name:", _kc.preferred_username);
                console.log("Realm roles:", _kc.realmAccess.roles);
                // console.log("Resource roles:", _kc.resourceAccess.roles);

            }// } else {
            //   doLogin();
            // }
        })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

_kc.onAuthError = () => {
    console.log("Authentication error!")
}

_kc.onTokenExpired = () => {
    console.log("Token expired!");
}

_kc.onAuthRefreshSuccess = () => {
    console.log("Access token is refreshed!");
}

_kc.onAuthRefreshError = () => {
    console.log("Refresh token is error!")
}

_kc.onAuthLogout = () => {
    console.log("User logging out!")
}

const getUsername = () => _kc.tokenParsed?.preferred_username;

const isGranted = (permissionName) => {
    return _kc.hasRealmRole(permissionName);
}

const isGrantedAny = (permissionsList) => {
    if (!permissionsList || permissionsList.length <= 0) {
        return true;
    }

    for (let i = 0; i < permissionsList.length; i++) {
        if (isGranted(permissionsList[i])) {
            return true;
        }
    }
    return false;
}

const isGrantedAll = (permissionsList) => {
    if (!permissionsList || permissionsList.length <= 0) {
        return true;
    }

    for (var i = 0; i < permissionsList.length; i++) {
        if (!isGranted(permissionsList[i])) {
            return false;
        }
    }

    return true;
}

const authService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    isGranted,
    isGrantedAll,
    isGrantedAny
};

export default authService;
