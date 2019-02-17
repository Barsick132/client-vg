import {createReducer} from 'redux-create-reducer'
import C from '../constants'
import uniqid from 'uniqid'

const initialState = [
    {
        id: uniqid('sys_msg'),
        systemText: "Волонтер скоро присоединится к чату. Ждемс :)",
        dt: new Date()
    }
];

export default createReducer(initialState, {
    [C.SHOW_CHAT](state, action) {
        return initialState;
    },
    [C.ADD_MSG](state, action) {
        return [
            ...state,
            {
                id: action.payload.id,
                text: action.payload.text,
                dt: action.payload.dt,
                isOwn: action.payload.isOwn
            }
        ]
    },

    [C.ADD_BTN_MSG](state, action) {
        return [
            ...state,
            {
                id: uniqid('bot_msg'),
                text: action.payload.text,
                dt: new Date(),
                buttons: action.payload.buttons
            }
        ]
    },
    [C.ADD_SYS_MSG](state, action) {
        return [
            ...state,
            {
                id: uniqid('sys_msg'),
                systemText: action.payload.systemText,
                dt: new Date()
            }
        ]
    },
    [C.ADD_ALL_MSGS](state, action) {
        return [
            ...state,
            ...action.payload
        ]
    }
})

export const getAllMessages = (state) => state.redMessages;