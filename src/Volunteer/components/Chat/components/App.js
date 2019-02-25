import * as React from 'react'
import {connect} from 'react-redux'
import {
    sendMessage,
    getAllMsgsAct,
    actStopChat
} from '../actions'
import ChatView from './ChatView'
import uniqid from 'uniqid'
import {getAllMessages} from "../reducers/messages";
import {getUsers} from "../reducers/users";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.props.getAllMsgs();
    }

    componentWillUnmount() {
        this.props.stopChat();
    }

    render() {
        return (
            <ChatView {...this.props}/>
        )
    }
}

const parseDate = date => {
    const options = {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString("ru", options);
};

const parseMessages = (msgs, users) => {

    let events = [];
    let prev_isOwn = undefined;
    let msgGroup = undefined;

    const addMsgGroup = () => {
        if (prev_isOwn !== undefined && msgGroup.isOwn !== null) {
            if (msgGroup.messages.length === 1) {
                msgGroup.messages[0].radiusType = undefined;
            } else {
                msgGroup.messages[msgGroup.messages.length - 1].radiusType = 'last';
            }
        }
        if (msgGroup !== undefined) events.push(msgGroup);
    };

    const getAuthorName = (isOwn) => {
        let authorName = "Волонтер";
        if (!isOwn) {
            if (users.filter((user) => user.role === 'Client').length !== 0) {
                authorName = users.filter((user) => user.role === 'Client')[0].name;
            }
        } else {
            if (users.filter((user) => user.role !== 'Client').length !== 0) {
                authorName = users.filter((user) => user.role !== 'Client')[0].name;
            }
        }
        return authorName;
    };

    msgs.map(msg => {
        if (msg.text !== undefined) {
            if (msg.buttons !== undefined) {
                addMsgGroup();

                prev_isOwn = undefined;
                msgGroup = {
                    id: uniqid('msgGroup'),
                    isOwn: false,
                    messages: [{
                        id: msg.id,
                        dt: parseDate(msg.dt),
                        text: msg.text,
                        authorName: 'Bot',
                        buttons: msg.buttons
                    }]
                }
            } else {
                if (prev_isOwn === msg.isOwn) {
                    msgGroup.messages.push({
                        id: msg.id,
                        dt: parseDate(msg.dt),
                        text: msg.text,
                        authorName: getAuthorName(msg.isOwn),
                    });
                } else {
                    addMsgGroup();

                    prev_isOwn = msg.isOwn;

                    msgGroup = {
                        id: uniqid('msgGroup'),
                        isOwn: msg.isOwn,
                        messages: [{
                            id: msg.id,
                            dt: parseDate(msg.dt),
                            text: msg.text,
                            authorName: getAuthorName(msg.isOwn),
                            radiusType: 'first'
                        }]
                    }
                }
            }
        }
        if (msg.systemText !== undefined) {
            if (prev_isOwn === null) {
                msgGroup.messages.push({
                    id: msg.id,
                    systemText: msg.systemText,
                    dt: parseDate(msg.dt)
                })
            } else {
                addMsgGroup();

                prev_isOwn = null;
                msgGroup = {
                    id: uniqid('msgGroup'),
                    isOwn: null,
                    messages: [{
                        id: msg.id,
                        systemText: msg.systemText,
                        dt: parseDate(msg.dt)
                    }]
                }
            }
        }
    });
    addMsgGroup();
    return events;
};

const mapStateToProps = (state, ownProps) => {
    const users = getUsers(state);

    state.chat.stop_chat = false;
    if (ownProps.dlg_id !== state.chat.dlg_id) {
        state.chat = {
            ...state.chat,
            last_msg_id: null,
            rqt_id: ownProps.rqt_id,
            dlg_id: ownProps.dlg_id,
        };
        state.users = [
            {
                id: uniqid('user'),
                name: ownProps.cli_fullname || 'Клиент',
                role: 'Client'
            },
            {
                id: ownProps.vol_id,
                name: ownProps.vol_fullname.split(' ').length === 3 ?
                    ownProps.vol_fullname.split(' ')[1] :
                    ownProps.vol_fullname,
                role: ownProps.vol_admin === 'true' ? 'Admin' : 'Volunteer'
            },
        ];
        state.redMessages = [
            {
                id: uniqid('sys_msg'),
                systemText: "Клиент ждет твоего сообщения ;)",
                dt: new Date()
            }
        ]
    }
    return {
        events: parseMessages(getAllMessages(state), getUsers(state))
    }
};

const mapDispatchToProps = dispatch => ({
    stopChat: () => {
        dispatch(
            actStopChat()
        );
    },
    getAllMsgs: () => {
        dispatch(
            getAllMsgsAct()
        );
    },
    onMessageSend: data => {
        dispatch(
            sendMessage({
                text: data,
            }),
        )
    }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer