import C from './constants'
import CONST from "../../../constants";
import {getDlgID, getLastMsgID} from "./reducers/chat";
import {getVolID} from "./reducers/users";
import {
    getAllMsgsAct,
    addAllMsgs,
    addBtnMsgs,
    addSysMsg,
    setLastMsgID
} from "./actions";
import {call, takeEvery, put, select} from 'redux-saga/effects'

const FILE = '.src/Volunteer/components/Chat/sagas.js';

function* sendMsg(store, {payload}) {
    const FUNC_NAME = "sendMsg(action, store)";
    console.log(FILE, FUNC_NAME, 'start');

    const dlg_id = yield select(getDlgID);
    const vol_id = yield select(getVolID);
    const body = {
        dlg_id: dlg_id,
        msg_sendervolid: parseInt(vol_id),
        msg_text: payload.text
    };

    try {
        const data = yield call(() => {
            return fetch(CONST.SERVER_HOST + 'sendMsg', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(body)
            }).then((res) => res.json());
        });

        if (data.status !== 'OK') throw new Error('status don\'t OK');
    } catch (err) {
        console.error(FILE, FUNC_NAME, err);

        yield put(addBtnMsgs({
            text: 'Не удалось отправить сообщение. Попробуем снова?',
            buttons: [
                {
                    title: 'Да',
                    click: () => {
                        store.dispatch(addSysMsg({text: 'Повторная отправка...'}));
                        store.dispatch(sendMsg(store, {payload: payload}));
                    }
                }]
        }));
    }
}

function* getAllMsgs(store) {
    const FUNC_NAME = "getAllMsgs(store)";
    console.log(FILE, FUNC_NAME, 'start');

    const dlg_id = yield select(getDlgID);
    const vol_id = yield select(getVolID);
    const body = {
        dlg_id: dlg_id,
        msg_sendervolid: parseInt(vol_id)
    };

    console.log(FILE, FUNC_NAME, '\nstop_chat: ', store.getState().chat.stop_chat);
    if (store.getState().chat.stop_chat) {
        return;
    }

    try {
        const data = yield call(() => {
            return fetch(CONST.SERVER_HOST + 'getDialogMsgs', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(body)
            }).then((res) => res.json());
        });

        if (data.status !== 'OK') throw new Error('status don\'t OK');

        console.log(FILE, FUNC_NAME, 'Messages received');
        const last_msg_id = yield select(getLastMsgID);
        let array_msgs = [];
        if (last_msg_id !== null) {
            // Добавляем только те, которые находятся ниже last_msg_id и фиксируем новый last_msg_id
            console.log(FILE, FUNC_NAME, 'This is don\'t first request messages');
            array_msgs = data.array_msg.filter((msg, i, arr) => {
                return i > arr.findIndex(msg => msg.msg_id === last_msg_id);
            })
        } else {
            // Добавляем все сообщения и фиксируем ID последннего
            console.log(FILE, FUNC_NAME, 'This is first request messages');
            array_msgs = data.array_msg;
        }

        if (array_msgs.length > 0) {
            yield put(addAllMsgs(array_msgs));
            yield put(setLastMsgID(array_msgs[array_msgs.length - 1].msg_id));
        }

        // Ждем 2 секунды и повторяем запрос
        yield new Promise(
            resolve => setTimeout(resolve, 2000)
        );
        yield put(getAllMsgsAct())
    } catch (err) {
        console.error(FILE, FUNC_NAME, err);

        yield put(addBtnMsgs({
            text: 'Не удалось запросить сообщения. Попробуем еще?',
            buttons: [
                {
                    title: 'Да',
                    click: () => {
                        store.dispatch(addSysMsg({text: 'Запрашиваю сообщения...'}));
                        store.dispatch(getAllMsgsAct());
                    }
                }]
        }));
    }
}

export default function* (store) {
    yield takeEvery(C.GET_ALL_MSGS, getAllMsgs, store);
    yield takeEvery(C.SEND_MSG, sendMsg, store);
}