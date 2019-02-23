import React from 'react'
import './volunteer.css'
import {Provider} from 'react-redux'
import configureStore from './store'
import AppContainer from './containers/AppContainer'
import rootSaga from './sagas'

const store = configureStore();
store.runSaga(rootSaga, store);

export default class Volunteer extends React.Component {

    constructor() {
        super();

        document.title = "Voice Gen. Vol.";
    }

    render() {
        return (
            <div className="bodyVol h-100">
                <Provider store={store}>
                    <AppContainer {...this.props}/>
                </Provider>
            </div>
        );
    }
}