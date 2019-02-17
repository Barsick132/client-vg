import C from './constants'
import uniqid from 'uniqid'

export const showChat = function ({show}) {
    return {
        type: C.SHOW_CHAT,
        payload: {
            show: show
        }
    }
};

export const showDefProps = function () {
    return {
        type: C.SET_DEF_PROPS
    }
};

export const setFuncClose = function ({funcClose}) {
    return {
        type: C.SET_FUNC_CLS,
        payload: {
            funcClose: funcClose
        }
    }
};

export const initDlg = function ({rqt_id, dlg_id}) {
    return {
        type: C.INIT_DLG,
        payload: {
            rqt_id: rqt_id,
            dlg_id: dlg_id
        }
    }
};

export const addCli = function ({cli_id}) {
    return {
        type: C.ADD_CLI,
        payload: {
            cli_id: cli_id
        }
    }
};

export const addUser = function ({name, role}) {
    return {
        type: C.ADD_USER,
        payload: {
            name: name,
            role: role
        }
    }
};

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

export const getDlgInfo = function () {
    return {
        type: C.GET_DLG_INFO
    }
};

export const getAllMsgsAct = function () {
    return {
        type: C.GET_ALL_MSGS
    }
};