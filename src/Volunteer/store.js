import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {persistCombineReducers} from "redux-persist";
import storage from "redux-persist/es/storage";
import login from './reducers/login'
import volunteer from './reducers/volunteer'
import request from './reducers/request'

const config = {
    key: 'root',
    storage,
};

const reducer = persistCombineReducers(config, {
    login,
    volunteer,
    request
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

    return store;
};

export default configureStore