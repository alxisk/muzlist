import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

let store // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
} else {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
}

sagaMiddleware.run(rootSaga)

export default store
