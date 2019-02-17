import {Provider} from 'react-redux'
import * as React from 'react'
import configureStore from './store'
import AppContainer from './components/App'
import rootSaga from './sagas'

const store = configureStore();
store.runSaga(rootSaga, store);

export class Chat extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppContainer {...this.props}/>
            </Provider>
        );
    }
}