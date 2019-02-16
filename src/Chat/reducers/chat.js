import {createReducer} from 'redux-create-reducer'
import C from '../constants'

const initialState = {
    show: false,
    rqt_id: null,
    dlg_id: null,
    last_msg_id: null
};

export default createReducer(initialState, {
    [C.SHOW_CHAT](state, action) {
        if(action.payload.show===false){
            state.funcClose();
            return initialState;
        }

        return {
            ...initialState,
            show: action.payload.show,
        }
    },
    [C.SET_FUNC_CLS](state, action) {
        return {
            ...state,
            funcClose: action.payload.funcClose,
        }
    },
    [C.INIT_DLG](state, action) {
        return {
            ...state,
            rqt_id: action.payload.rqt_id,
            dlg_id: action.payload.dlg_id
        }
    },
    [C.WAIT_VOL](state, action) {
        return {
            ...state,
            wait_vol: action.payload.wait_vol
        }
    },
    [C.SET_LAST_MSG](state, action) {
        return {
            ...state,
            last_msg_id: action.payload.last_msg_id
        }
    }
})

export const getShowChat = (state) => state.chat.show;
export const getRqtID = (state) => state.chat.rqt_id;
export const getDlgID = (state) => state.chat.dlg_id;
export const getLastMsgID = (state) => state.chat.last_msg_id;