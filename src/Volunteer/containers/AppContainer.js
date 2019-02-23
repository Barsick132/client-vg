import {connect} from "react-redux";
import App from '../components/App'
import {actLogin, actSignOut} from "../actions/login";
import {actActivNavItem} from "../actions/volunteer";
import {actWaitingReq} from "../actions/request";
import {getErrorMessage, getRememberMe} from '../reducers/login'
import {getActivePage} from '../reducers/volunteer'
import {getReqData, getReqErrMsg} from '../reducers/request'

const FILE = './src/Volunteer/containers/AppContainer.js';

const mapStateToProps = state => {
    const FUNC = 'mapStateToProps(state)';
    console.log(FILE, FUNC, '\n', 'start');

    return {
        errorMessage: getErrorMessage(state),
        remember_me: getRememberMe(state),
        activePage: getActivePage(state),
        rqt_data: getReqData(state),
        errorMsgRqt: getReqErrMsg(state),
    }
};

const mapDispatchToProps = dispatch => ({
    onLogin: (login, pass, remember) => {
        const FUNC = 'onLogin(login, pass, remember)';
        console.log(FILE, FUNC, '\n', 'start');

        dispatch(
            actLogin(login, pass, remember)
        )
    },
    activNavItem: eventKey => {
        const FUNC = 'activNavItem(eventKey)';
        console.log(FILE, FUNC, '\n', 'start');

        dispatch(
            actActivNavItem(eventKey)
        )
    },
    signOut: () => {
        const FUNC = 'signOut()';
        console.log(FILE, FUNC, '\n', 'start');

        dispatch(
            actSignOut()
        )
    },
    waitingReq: (vol_id, token) => {
        const FUNC = 'waitingReq(vol_id,token)';
        console.log(FILE, FUNC, '\n', 'start');

        dispatch(
            actWaitingReq(vol_id, token)
        )
    }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer