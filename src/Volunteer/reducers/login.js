import {createReducer} from 'redux-create-reducer'
import C from '../constants'
import {storageKeys as CONST} from '../../constants';

const FILE = './src/Volunteer/reducers/login.js';

const initialState = {
    remember_me: false,
};

export default createReducer(initialState, {
    [C.LOGIN_ERROR_MESSAGE](state, action) {
        console.log(FILE, C.LOGIN_ERROR_MESSAGE, '\n', 'start');

        return {
            ...state,
            errorMessage: action.payload.errorMessage
        }
    },
    [C.LOGIN_USER_LOGGED](state, action) {
        console.log(FILE, C.LOGIN_USER_LOGGED, '\n', 'start');

        if (action.payload.remember) {
            localStorage.setItem(CONST.TOKEN, action.payload.token);
            localStorage.setItem(CONST.VOL_ID, action.payload.vol_id);
            localStorage.setItem(CONST.VOL_FULLNAME, action.payload.vol_fullname);
            localStorage.setItem(CONST.VOL_ADMIN, action.payload.vol_admin);
        } else {
            sessionStorage.setItem(CONST.TOKEN, action.payload.token);
            sessionStorage.setItem(CONST.VOL_ID, action.payload.vol_id);
            sessionStorage.setItem(CONST.VOL_FULLNAME, action.payload.vol_fullname);
            sessionStorage.setItem(CONST.VOL_ADMIN, action.payload.vol_admin);
        }

        return {
            ...state,
            remember_me: true,
            vol_data: action.payload
        }
    },
    [C.SIGN_OUT] (state, action) {
        localStorage.removeItem(CONST.TOKEN);
        localStorage.removeItem(CONST.VOL_ID);
        localStorage.removeItem(CONST.VOL_FULLNAME);
        localStorage.removeItem(CONST.VOL_ADMIN);
        sessionStorage.removeItem(CONST.TOKEN);
        sessionStorage.removeItem(CONST.VOL_ID);
        sessionStorage.removeItem(CONST.VOL_FULLNAME);
        sessionStorage.removeItem(CONST.VOL_ADMIN);

        return {}
    }
})

export const getErrorMessage = state => state.login.errorMessage;
export const getRememberMe = state => state.login.remember_me;