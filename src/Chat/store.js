import { applyMiddleware, createStore, compose } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import chat from './reducers/chat'
import users from './reducers/users'
import redMessages from './reducers/messages'

const config = {
    key: 'root',
    storage,
};

const reducer = persistCombineReducers(config, {
    chat,
    users,
    redMessages
});

const sagaMiddleware = createSagaMiddleware();

const composeCreateStore = () =>
    compose(applyMiddleware(sagaMiddleware))(
        createStore,
    );

const configureStore = port => {
    const finalCreateStore = composeCreateStore(port);
    const store = {
        ...finalCreateStore(reducer),
        runSaga: sagaMiddleware.run,
    };

    // if (module.hot) {
    // 	module.hot.accept('./reducers', () => store.replaceReducer(reducer))
    // }
    //const persistor = persistStore(store)
    return store;
};

export default configureStore
