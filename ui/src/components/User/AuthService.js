import react from 'React';
import axios from 'axios';
import * as cookieManager from '../../utils/CookieManager';
import Constants from '../../utils/Constants';


const AuthService = {
    login(email, password, callback) {
        if (cookieManager.getCookie(Constants.CookieKey)) {
            cookieManager.removeCookie(Constants.CookieKey);
        }

        axios.post("/login", { email, password })
            .then(response => {
                if (response.status == 200) {
                    cookieManager.setCookie(Constants.CookieKey, response.data.token);
                    return callback(response);
                }
                else {
                    return callback(null);
                }
            }, error => {
                if (error.response.status <= 499) {
                    return callback(error.response)
                }
                console.log(error);
                throw new Error(error);
            })
    },
    logout(callback) {
        axios.post("/api/user/logout", null, cookieManager.getCookie(Constants.CookieKey))
            .then(response => {
                if (response.status == 200)
                    return callback(null);
                else
                    return callback(null);
            }, error => {
                if (error.response.status == 401) {
                    cookieManager.removeCookie(Constants.CookieKey);
                    localStorage.removeItem(Constants.LocalStorageKey);
                    return callback(error)
                }
                else
                    return callback(null);
                console.log(error);
                throw new Error(error);
            })
    }
};

export default AuthService;