import {createReducer} from 'redux-create-reducer'
import C from '../constants'
import uniqid from 'uniqid'

const initialState = [];

export default createReducer(initialState, {
    [C.SHOW_CHAT](state, action) {
        return initialState;
    },
    [C.ADD_CLI](state, action) {
        return [
            ...state,
            {
                id: action.payload.cli_id,
                name: 'Я',
                role: 'Client'
            }
        ]
    },
    [C.ADD_USER](state, action) {
        return [
            ...state,
            {
                id: uniqid('user'),
                name: action.payload.name,
                role: action.payload.role
            }
        ]
    }
})

export const getUsers = (state) => state.users;
export const getCliID = (state) => {
    return state.users.filter((user) => user.role === 'Client')[0].id;
};

