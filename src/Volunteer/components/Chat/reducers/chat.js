import {createReducer} from 'redux-create-reducer'
import C from '../constants'

const initialState = {
    rqt_id: null,
    dlg_id: null,
    last_msg_id: null,
    stop_chat: false
};

export default createReducer(initialState, {
    [C.SET_LAST_MSG](state, action) {
        return {
            ...state,
            last_msg_id: action.payload.last_msg_id
        }
    },
    [C.STOP_CHAT](state, action) {
        return {
            ...state,
            stop_chat: true
        }
    }
})

export const getRqtID = (state) => state.chat.rqt_id;
export const getDlgID = (state) => state.chat.dlg_id;
export const getLastMsgID = (state) => state.chat.last_msg_id;