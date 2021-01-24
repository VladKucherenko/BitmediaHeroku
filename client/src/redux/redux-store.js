import { usersList } from "./users_list-reducer";
import { usersStatistic } from "./user_statistic-reducer";
import thunkMiddleware from 'redux-thunk';

const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let rootReducers = combineReducers({
    usersStatistic,
    usersList
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;
