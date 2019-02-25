import {createReducer} from 'redux-create-reducer'
import C from '../constants'
import {storageKeys as CONST} from "../../constants";

const FILE = './src/Volunteer/reducers/request.js';

const initialState = {};

export default createReducer(initialState, {
    [C.REQ_DATA_RECEIVED](state, action) {
        console.log(FILE, C.REQ_DATA_RECEIVED, '\n', 'start');

        return {
            ...state,
            req_data: action.payload
        }
    },
    [C.REQ_DATA_CLEAR](state, action) {
        console.log(FILE, C.REQ_DATA_CLEAR, '\n', 'start');

        return {
            ...state,
            req_data: undefined
        }
    },
    [C.REQ_SET_ERR_MSG](state, action) {
        console.log(FILE, C.REQ_DATA_CLEAR, '\n', 'start');

        return {
            ...state,
            errorMsgRqt: action.payload
        }
    },
    [C.REQ_ERR_MSG_CLEAR](state, action) {
        console.log(FILE, C.REQ_ERR_MSG_CLEAR, '\n', 'start');

        return {
            ...state,
            errorMsgRqt: undefined
        }
    },
    [C.SIGN_OUT] (state, action) {
        return {}
    }
})

export const getReqData = (state) => state.request.req_data;
export const getReqErrMsg = (state) => state.request.errorMsgRqt;

