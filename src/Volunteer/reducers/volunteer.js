import {createReducer} from 'redux-create-reducer'
import {vol_pages, constants as C} from '../constants'

const FILE = './src/Volunteer/reducers/login.js';

const initialState = {
    activeKey: vol_pages.REQUEST,
};

export default createReducer(initialState, {
    [C.ACTIVE_NAV_ITEM](state, action) {
        console.log(FILE, C.ACTIVE_NAV_ITEM, '\n', 'start');

        return {
            ...state,
            activeKey: action.payload.activeKey
        }
    }
})

export const getActivePage = state => state.volunteer.activeKey;