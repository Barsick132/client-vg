import * as React from 'react'
import {connect} from 'react-redux'
import {
    setFuncClose,
    sendMessage,
    addCli,
    getDlgInfo,
    initDlg,
    showChat,
    getAllMsgsAct
} from '../actions'
import {getShowChat} from '../reducers/chat'
import ChatView from './ChatView'
import uniqid from 'uniqid'
import {getAllMessages} from "../reducers/messages";
import {getUsers} from "../reducers/users";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.initChat = this.initChat.bind(this);
    }

    initChat(rqt_id, dlg_id, cli_id, funcClose) {
        // this.props.onShowChat(true);
        this.props.initDialog(rqt_id, dlg_id, cli_id, funcClose);
    }

    componentDidMount() {
        this.props.onRef(this.initChat)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
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

    const getAuthorName = (isOwn) =>{
        let authorName = "Волонтер";
        if (!isOwn) {
            if(users.filter((user) => user.role !== 'Client').length !== 0){
                authorName = users.filter((user) => user.role !== 'Client')[0].name;
            }
        }else {
            authorName = 'Я'
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

const mapStateToProps = state => {
    return {
        events: parseMessages(getAllMessages(state), getUsers(state)),
        show: getShowChat(state)
    }
};

const mapDispatchToProps = dispatch => ({

    onShowChat: show => {
        dispatch(
            showChat({
                show: show,
            }),
        )
    },
    initDialog: (rqt_id, dlg_id, cli_id, funcClose) => {
        dispatch(
            showChat({
                show: true
            })
        );
        dispatch(
            setFuncClose({
                funcClose: funcClose
            })
        );
        dispatch(
            initDlg({
                rqt_id: rqt_id,
                dlg_id: dlg_id
            })
        );
        dispatch(
            addCli({
                cli_id: cli_id
            })
        );
        dispatch(
            getAllMsgsAct()
        );
        dispatch(
            getDlgInfo()
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