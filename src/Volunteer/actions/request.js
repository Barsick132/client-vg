import C from '../constants'

const FILE = './src/Volunteer/actions/request.js';

export const actWaitingReq = function (vol_id, token) {
    const FUNC = 'actWaitingReq(vol_id, token)';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.REQ_WAITING,
        payload: {
            vol_id: vol_id,
            token: token
        }
    }
};

export const actReqDataReceived = function ({cli_data, rqt_id, dlg_id,
                                                rqt_url, rqt_comment,
                                                rqt_imgsource, rqt_dt}) {
    const FUNC = 'actReqDataReceived({...})';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.REQ_DATA_RECEIVED,
        payload: {
            cli_data: cli_data,
            rqt_id: rqt_id,
            dlg_id: dlg_id,
            rqt_url: rqt_url,
            rqt_comment: rqt_comment,
            rqt_imgsource: rqt_imgsource,
            rqt_dt: rqt_dt,
        }
    }
};

export const actReqDataClear = function () {
    const FUNC = 'actReqDataClear()';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.REQ_DATA_CLEAR
    }
};

export const actReqSetErrMsg = function ({head, body, buttons}) {
    const FUNC = 'actReqSetErrMsg()';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.RQT_SET_ERR_MSG,
        payload: {
            head: head,
            body: body,
            buttons: buttons
        }
    }
};

export const actReqErrMsgClear = function () {
    const FUNC = 'actReqErrMsgClear()';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        type: C.REQ_ERR_MSG_CLEAR
    }
};