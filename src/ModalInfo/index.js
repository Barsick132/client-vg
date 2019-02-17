import {connect, Provider} from 'react-redux'
import * as React from 'react'
import {createStore} from 'redux'
import {Modal} from 'react-bootstrap';

const SHOW_MODAL = 'SHOW_MODAL';

function showModal(show) {
    return {
        type: SHOW_MODAL,
        payload: {
            show: show
        }
    };
}

function reducer(state = {show: true}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                show: action.payload.show
            };
        default:
            return state
    }
}

const store = createStore(reducer);

const mapStateToProps = state => {
    return {
        show: state.show
    }
};

const mapDispatchToProps = dispatch => ({
    onShowModal: (show) => {
        dispatch(
            showModal(show)
        )
    }
});

const ModalInfoBody = connect(mapStateToProps, mapDispatchToProps)(({show, header, body, onShowModal}) => {
    return (
        <Modal show={show} onHide={() => onShowModal(false)}
               aria-labelledby="contained-modal-title-vcenter" centered={true} style={{ position: 'absolute', zIndex: 1051}}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    );
});

export class ModalInfo extends React.Component {

    constructor(props){
        super(props);

        if(props.show !== undefined) {
            store.dispatch(showModal(props.show));
        }
    }

    render() {
        return (
            <Provider store={store}>
                <ModalInfoBody {...this.props}/>
            </Provider>
        );
    }
}