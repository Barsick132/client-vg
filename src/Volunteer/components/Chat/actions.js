import C from './constants'
import uniqid from 'uniqid'

export const addMsg = function ({id, text, dt, isOwn}) {
    return {
        type: C.ADD_MSG,
        payload: {
            id: id,
            text: text,
            dt: dt,
            isOwn: isOwn
        }
    }
};

export const addAllMsgs = function (msgs) {
    let new_msgs = [];

    msgs.map(msg => new_msgs.push({
        id: msg.msg_id,
        text: msg.msg_text,
        dt: new Date(msg.msg_dt),
        isOwn: msg.msg_fromyou
    }));

    return {
        type: C.ADD_ALL_MSGS,
        payload: new_msgs
    };
};

export const addBtnMsgs = function ({text, buttons}) {
    let new_buttons = [];

    buttons.map(btn => new_buttons.push({
        id: uniqid('btn'),
        title: btn.title,
        click: btn.click
    }));

    return {
        type: C.ADD_BTN_MSG,
        payload: {
            text: text,
            buttons: new_buttons
        }
    };
};

export const addSysMsg = function ({text}) {
    return {
        type: C.ADD_SYS_MSG,
        payload: {
            systemText: text
        }
    }
};

export const setLastMsgID = function (last_msg_id) {
    return {
        type: C.SET_LAST_MSG,
        payload: {
            last_msg_id: last_msg_id
        }
    }
};

export const sendMessage = function ({text}) {
    return {
        type: C.SEND_MSG,
        payload: {
            text: text
        }
    }
};

export const getAllMsgsAct = function () {
    return {
        type: C.GET_ALL_MSGS
    }
};

export const actStopChat = function () {
    return {
        type: C.STOP_CHAT
    }
};