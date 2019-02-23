import C from './constants'
import {call, takeEvery, put} from 'redux-saga/effects'
import CONST from "../constants";
import {actShowErrorMessage, actVolLogged} from "./actions/login";
import {actReqDataReceived, actReqErrMsgClear, actReqSetErrMsg, actWaitingReq} from "./actions/request";
import React from "react";

const FILE = './src/Volunteer/sagas.js';

function* onLogin(store, {payload}) {
    const FUNC_NAME = "onLogin(store, {payload})";
    console.log(FILE, FUNC_NAME, '\n', 'start');

    const body = {
        email: payload.email,
        pass: payload.pass
    };

    try {
        const data = yield call(() => {
            return fetch(CONST.SERVER_HOST + 'login', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(body)
            }).then((res) => res.json());
        });

        if (data.status !== 'OK') throw Error('status don\'t OK');

        // Если логин и пароль верный, то фиксируем данные пользователя
        // и открываем страницу с запросами
        yield put(actVolLogged({
            remember: payload.remember,
            token: data.token,
            vol_id: data.vol_id,
            vol_fullname: data.vol_fullname,
            vol_admin: data.vol_admin
        }));
    } catch (err) {
        console.error(FILE, FUNC_NAME, err);

        // Выводи сообщение не верном логине или пароле
        yield put(actShowErrorMessage('Не верный логин или пароль'))
    }
}

function* onWaitingReq(store, {payload}) {
    const FUNC_NAME = "onWaitingReq(store, {payload})";
    console.log(FILE, FUNC_NAME, '\n', 'start');

    const body = {
        vol_id: parseInt(payload.vol_id),
        token: payload.token
    };

    try {
        const data = yield call(() => {
            return fetch(CONST.SERVER_HOST + 'getRequest', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(body)
            }).then((res) => res.json());
        });

        console.log(FILE, FUNC_NAME, '\nRequest status: ', data.status);
        switch (data.status) {
            case 'OK': {
                yield put(actReqDataReceived({
                    cli_data: data.request_data.client,
                    rqt_id: data.request_data.rqt_id,
                    dlg_id: data.request_data.dlg_id,
                    rqt_url: data.request_data.rqt_url,
                    rqt_comment: data.request_data.rqt_comment,
                    rqt_imgsource: data.request_data.rqt_imgsource,
                    rqt_dt: data.request_data.rqt_dt,
                }));
                break;
            }
            case 'NOT FOUND RQT': {
                yield new Promise(
                    resolve => setTimeout(resolve, 2000)
                );
                yield put(actWaitingReq(payload.vol_id, payload.token));
                break;
            }
            default: {
                throw Error('status don\'t OK');
            }
        }
    } catch (err) {
        console.error(FILE, FUNC_NAME, err);

        // Выводи сообщение о том, что не получилось запросить данные и
        // предложить повторить попытку

        yield put(actReqSetErrMsg({
            head: 'Упс' + <span role="img" aria-label="DISAPPOINTED BUT RELIEVED FACE">&nbsp;&#128549;&nbsp;</span>,
            body: 'При запросе заявки произошла какая-то ошибка' +
            <span role="img" aria-label="THINKING FACE">&nbsp;&#129300;&nbsp;</span> + '. Попробуем еще раз?',
            buttons: [
                {
                    text: 'Да',
                    click: () => store.dispatch(
                        actReqErrMsgClear(),
                        actWaitingReq(payload.vol_id, payload.token)
                    )
                }
            ]
        }))
    }
}

export default function* (store) {
    yield takeEvery(C.LOGIN, onLogin, store);
    yield takeEvery(C.REQ_WAITING, onWaitingReq, store);
}