import Cookies from 'universal-cookie';

export const setCookie = (keyname, basicAuthToken) => {
    const cookies = new Cookies();
    const value = { headers: { 'Authorization': `Basic ${basicAuthToken}` } }
    cookies.set(keyname, value);
}

export const getCookie = (keyname) => {
    const cookies = new Cookies();
    return cookies.get(keyname);
}

export const removeCookie = (keyname) => {
    const cookies = new Cookies();
    cookies.remove(keyname);
}

