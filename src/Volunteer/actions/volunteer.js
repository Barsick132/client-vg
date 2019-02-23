import C from '../constants'

const FILE = './src/Volunteer/actions/volunteer.js';

export const actActivNavItem = function (eventKey) {
    const FUNC = 'actActivNavItem(eventKey)';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.ACTIVE_NAV_ITEM,
        payload: {
            activeKey: eventKey
        }
    }
};