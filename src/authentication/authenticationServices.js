import { styleCodeSnippet } from "components/common/CustomCKE/CKEditorUtils";
import Keycloak from "keycloak-js";
import { getCurrentUserSummary } from 'redux/services/authServices'
import { get_CurrentUserSummaryReset } from 'redux/actions/authAction'
import store from "redux/store";

const _kc = new Keycloak('/keycloak.config.json');

const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then((authenticated) => {
            onAuthenticatedCallback();
            if (_kc.token) {
                store.dispatch(getCurrentUserSummary())
            }
        })
};

const doLogin = () => { _kc.login(); styleCodeSnippet(); }

const doLogout = () => {
    _kc.logout();
    store.dispatch(get_CurrentUserSummaryReset());
    styleCodeSnippet();
}

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const accountManagement = () => _kc.accountManagement()

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
    isGrantedAny,
    accountManagement
};

export default authService;
