import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/index'
import { autoRehydrate } from 'redux-persist'
import RehydrationServices from '../services/RehydrationServices'
import ReduxPersist from '../config/ReduxPersist'

export default (onComplete) => {
    /* ------------- Redux Configuration ------------- */
    const middleware = []
    const enhancers = []

    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);
    const logger = createLogger();
    middleware.push(logger);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware))

    // add the autoRehydrate enhancer
    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate())
    }
    const store = createStore(rootReducer, compose(...enhancers))
    if (ReduxPersist.active) {
        RehydrationServices.updateReducers(store, onComplete)
    }
    sagaMiddleware.run(rootSaga)
    return store
}