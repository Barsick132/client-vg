import C from '../constants'

const FILE = './src/Volunteer/actions/login.js';

export const actLogin = function (login, pass, remember) {
    const FUNC = 'actLogin(login, pass, remember)';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.LOGIN,
        payload: {
            email: login,
            pass: pass,
            remember: remember
        }
    }
};

export const actShowErrorMessage = function (errorMessage) {
    const FUNC = 'actShowErrorMessage(errorMessage)';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.LOGIN_ERROR_MESSAGE,
        payload: {
            errorMessage: errorMessage
        }
    }
};

export const actVolLogged = ({remember, token, vol_id, vol_fullname, vol_admin}) => {
    const FUNC = 'actVolLogged({remember, token, vol_id, vol_fullname, vol_admin})';
    console.log(FILE, FUNC, '\n', 'start');

    return{
        type: C.LOGIN_USER_LOGGED,
        payload:{
            remember: remember,
            token: token,
            vol_id: vol_id,
            vol_fullname: vol_fullname,
            vol_admin: vol_admin
        }
    }
};

export const actSignOut = () => {
    const FUNC = 'actSignOut()';
    console.log(FILE, FUNC, '\n', 'start');

    return{
        type: C.SIGN_OUT
    }
};