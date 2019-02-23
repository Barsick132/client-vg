import C from './constants'
import CONST from "../../constants";
import {getDlgID, getLastMsgID, getShowChat} from "./reducers/chat";
import {getCliID} from "./reducers/users";
import {
    getAllMsgsAct,
    addAllMsgs,
    addBtnMsgs,
    addSysMsg,
    addUser,
    getDlgInfo,
    showChat,
    setLastMsgID
} from "./actions";
import {call, takeEvery, put, select} from 'redux-saga/effects'

const FILE = './Chat/sagas.js';

function* sendMsg(store, {payload}) {
    const FUNC_NAME = "sendMsg(action, store)";
    console.log(FILE, FUNC_NAME, 'start');

    const dlg_id = yield select(getDlgID);
    const cli_id = yield select(getCliID);
    const body = {
        dlg_id: dlg_id,
        msg_sendercliid: cli_id,
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
                },
                {
                    title: 'Нет',
                    click: () => {
                    }
                }]
        }));
    }
}

function* getAllMsgs(store) {
    const FUNC_NAME = "getAllMsgs(store)";
    console.log(FILE, FUNC_NAME, 'start');

    const show_chat = yield select(getShowChat);
    if (!show_chat) {
        console.log(FILE, FUNC_NAME, 'chat closed');
        return;
    }

    const dlg_id = yield select(getDlgID);
    const cli_id = yield select(getCliID);
    const body = {
        dlg_id: dlg_id,
        msg_sendercliid: cli_id
    };

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
                },
                {
                    title: 'Нет',
                    click: () => {
                        store.dispatch(showChat({show: false}));
                    }
                }]
        }));
    }
}

function* getDialogInfo(store) {
    const FUNC_NAME = "getDialogInfo()";
    console.log(FILE, FUNC_NAME, 'start');

    const show_chat = yield select(getShowChat);
    if (!show_chat) {
        console.log(FILE, FUNC_NAME, 'chat closed');
        return;
    }

    const dlg_id = yield select(getDlgID);
    const cli_id = yield select(getCliID);
    const body = {
        dlg_id: dlg_id,
        msg_sendercliid: cli_id
    };

    try {
        const data = yield call(() => {
            return fetch(CONST.SERVER_HOST + 'getDialogInfo', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(body)
            }).then((res) => res.json());
        });

        if (data.status !== 'OK') throw new Error('status don\'t OK');

        if (data.interlocutor === null) {
            console.log(FILE, FUNC_NAME, 'don\'t connected interlocutor');
            yield new Promise(
                resolve => setTimeout(resolve, 2000)
            );
            yield put(getDlgInfo())
        } else {
            // Собеседник подключился
            console.log(FILE, FUNC_NAME, 'connected interlocutor');
            let fullName = data.interlocutor.split(' ');
            let name = "Волонтер";
            if (fullName.length === 3) {
                name = fullName[1];
            }else {
                name = data.interlocutor;
            }

            yield put(addUser({name: name, role: data.role}));
            yield put(addSysMsg({text: 'Волонтер подключился к чату'}));
        }
    } catch (err) {
        // Ошибка при попытке запроса собеседника
        console.error(FILE, FUNC_NAME, err);

        yield put(addBtnMsgs({
            text: 'Не удалось выполнить поиск Волонтера. Попробуем еще?',
            buttons: [
                {
                    title: 'Да',
                    click: () => {
                        store.dispatch(addSysMsg({text: 'Запрашиваю волонтера...'}));
                        store.dispatch(getDlgInfo());
                    }
                },
                {
                    title: 'Нет',
                    click: () => store.dispatch(
                        showChat({
                            show: false,
                        }),
                    )
                }]
        }));

    }
}

export default function* (store) {
    yield takeEvery(C.GET_DLG_INFO, getDialogInfo, store);
    yield takeEvery(C.GET_ALL_MSGS, getAllMsgs, store);
    yield takeEvery(C.SEND_MSG, sendMsg, store);
}