import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { newGame } from './helpers';

const initialState = newGame();

const store = createStore(rootReducer, initialState);

export default store;
