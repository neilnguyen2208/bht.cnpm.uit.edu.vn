import {
    userPostLogin,
    userPostRegister,
    userGetCurrentUser,
    userGetLogout,

    managementGetAllUsers,
    managementGetAllRoles
} from "redux/actions/userAction.js";

import { remoteServiceBaseUrl } from 'utils/requestUtils'

import FormData from 'form-data';
import Cookies from 'js-cookie';

//#region Fake data
const admin = {
    "statusCode": 5,
    "statusMessage": "Get account success!",
    "account": {
        "id": 1,
        "username": "phucnh",
        "displayName": "Nguyen Hong Phuc",
        "password": "123456",
        "avatarURL": 'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
        "email": "phuc98@gmail.com",
        "score": 100,
        "postCount": 0,
        "documentCount": 11,
        "roleId": 1,
        "roleName": "ADMIN"
    }
}


const collaborator_1 = {
    "statusCode": 5,
    "statusMessage": "Get account success!",
    "account": {
        "id": 1,
        "username": "dongnv1",
        "displayName": "Nguyễn Văn Đông",
        "password": "123456",
        "avatarURL": 'https://tinypng.com/images/social/website.jpg',
        "email": "jionvodoi@gmail.com",
        "score": 100,
        "postCount": 0,
        "documentCount": 11,
        "roleId": 2,
        "roleName": "COLLABORATOR"
    }
}

const user_1 = {
    "statusCode": 5,
    "statusMessage": "Get account success!",
    "account": {
        "id": 1,
        "username": "dongnv",
        "displayName": "Lưu Biêu Nghị",
        "password": "123456",
        "avatarURL": 'https://www.w3schools.com/w3css/img_avatar3.png',
        "email": "dongnv.since1999@gmail.com",
        "score": 100,
        "postCount": 0,
        "documentCount": 11,
        "roleId": 3,
        "roleName": "USER"
    }
}

//#endregion

export function postRegister(account) {
    return dispatch => {
        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("username", account.username);
        formdata.append("avatarURL", account.file);
        formdata.append("email", account.email);
        formdata.append("password", account.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
      
        fetch(`http://${remoteServiceBaseUrl}/register`, requestOptions)
            .then(response => response.text())
            .then(result => {
               
                dispatch(userPostRegister(JSON.parse(result).statusCode));
            })
            .catch(error => {
             
                dispatch(userPostRegister(error.statusCode));
            });
    }
}

export function postLogin(account) {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", account.username);
        urlencoded.append("password", account.password);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };


        fetch(`http://${remoteServiceBaseUrl}/login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                Cookies.set('JSESSIONID', JSON.parse(result).sessionID);
                Cookies.set('UID', JSON.parse(result).account.id);
                dispatch(userPostLogin(JSON.parse(result).account, JSON.parse(result).statusCode))

            })
            .catch(error => {
                dispatch(userPostLogin(null, error.statusCode));

            });

    }
}

export function getCurrentUser() {
    return dispatch => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // fetch(`http://${remoteServiceBaseUrl}/users/current?sessionID=${Cookies.get('JSESSIONID')}`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         dispatch(userGetCurrentUser(JSON.parse(result).account, JSON.parse(result).statusCode))

        //     })
        //     .catch(error => {
        //         console.log('error', error);
        //         dispatch(userGetCurrentUser(null, error.statusCode))
        //     })
        let result = admin;
        dispatch(userGetCurrentUser(result.account, result.statusCode))



    }
}


export function getLogout() {
    return dispatch => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        Cookies.remove('JSESSIONID');
        Cookies.remove('UID');
        fetch(`http://${remoteServiceBaseUrl}/logout`, requestOptions)
            .then(response => response.text())
            .then(result => {
                dispatch(userGetLogout(JSON.parse(result).statusCode));
            })
            .catch(error => console.log('error', error));
    }
}

export function management_getAllUsers() {
    return dispatch => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://${remoteServiceBaseUrl}/users?sessionID=` + Cookies.get('JSESSIONID'), requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(managementGetAllUsers(JSON.parse(result)));
                }
            )
            .catch(error => console.log('error', error));
    }
}

//#endregion

//#region for role
export function management_getAllRoles() {
    return dispatch => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://${remoteServiceBaseUrl}/usergroups`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(managementGetAllRoles(JSON.parse(result).bhtUserGroups));
                }
            )
            .catch(error => console.log('error', error));

        dispatch(managementGetAllRoles());
    }

}