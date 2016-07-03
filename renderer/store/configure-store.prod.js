import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import reducer from '../reducers';
import startIpc from '../middleware/ipc';
import rankingMiddleware from '../middleware/ranking';
import scroll from '../middleware/scroll';

export default function configureStore() {
	const router = routerMiddleware(hashHistory);
	const enhancer = compose(
		applyMiddleware(
			thunk,
			rankingMiddleware,
			scroll,
			router
		)
	);
	const store = createStore(reducer, enhancer);
	startIpc(store);
	return store;
}