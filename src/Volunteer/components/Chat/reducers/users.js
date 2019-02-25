import {createReducer} from 'redux-create-reducer'

const initialState = [];

export default createReducer(initialState, {

})

export const getUsers = (state) => state.users;
export const getVolID = (state) => {
    return state.users.filter((user) => user.role !== 'Client')[0].id;
};

