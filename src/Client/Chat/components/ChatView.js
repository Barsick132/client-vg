import * as React from 'react'
import {Modal} from 'react-bootstrap';
import {
    ThemeProvider,
    TextInput,
    MessageList,
    Message,
    MessageText,
    MessageGroup,
    MessageButtons,
    MessageButton,
    TextComposer,
    Row,
    Fill,
    Fit,
    SendButton,
    Bubble
} from '@livechat/ui-kit'

const ChatView = ({show, onShowChat, events = [], onMessageSend}) => {
    return (
        <div>
            <Modal show={show} onHide={() => {
                onShowChat(false)
            }}
                   aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Диалог с Волонтером</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ThemeProvider>
                        <div>
                            <div style={{height: "450px"}}>
                                <MessageList active containScrollInSubtree>
                                    {events.map((messageGroup) => (
                                        <MessageGroup
                                            avatarLetter={messageGroup.isOwn !== null ? messageGroup.messages[0].authorName[0] : undefined}
                                            isOwn={messageGroup.isOwn}
                                            key={messageGroup.id}
                                            onlyFirstWithMeta>
                                            {messageGroup.messages.map((message) => {

                                                if (message.text !== undefined) {
                                                    return (
                                                        <Message
                                                            date={message.dt}
                                                            isOwn={messageGroup.isOwn}
                                                            authorName={message.authorName}
                                                            radiusType={message.radiusType}
                                                            key={messageGroup.id + '_' + message.id}>

                                                            <Bubble isOwn={messageGroup.isOwn}
                                                                    radiusType={message.radiusType}>
                                                                <MessageText>{message.text}</MessageText>
                                                                {message.buttons &&
                                                                message.buttons.length !== 0 && (
                                                                    <MessageButtons>
                                                                        {message.buttons.map((button) => (
                                                                            <MessageButton
                                                                                key={button.id}
                                                                                label={button.title}
                                                                                onClick={button.click}
                                                                            />
                                                                        ))}
                                                                    </MessageButtons>
                                                                )}
                                                            </Bubble>
                                                        </Message>);
                                                }
                                                if (message.systemText !== undefined) {
                                                    return (
                                                        <div id={message.id} className="text-center px-5">
                                                            <small className="text-muted">{message.systemText}</small>
                                                        </div>);
                                                }
                                            })}
                                        </MessageGroup>
                                    ))}
                                </MessageList>
                            </div>
                            <TextComposer onSend={onMessageSend}>
                                <Row align="center">
                                    <Fill>
                                        <TextInput placeholder="Напиши что-нибудь :)"/>
                                    </Fill>
                                    <Fit>
                                        <SendButton/>
                                    </Fit>
                                </Row>
                            </TextComposer>
                        </div>
                    </ThemeProvider>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChatView