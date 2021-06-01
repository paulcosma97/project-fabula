import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import stateReducer from './state.reducer';

const middlewareEnhancer = applyMiddleware(thunk);
const store = createStore(stateReducer, middlewareEnhancer);
export default store;
