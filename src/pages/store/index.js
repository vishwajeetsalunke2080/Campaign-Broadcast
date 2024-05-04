import { createStore, applyMiddleware, combineReducers } from "redux";
import rootsaga from "./root-saga";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { persistStore } from "redux-persist";
import authReducer from "@/auth/reducer";

const rootReducers = combineReducers({
    auth:authReducer
});

const sagaMiddleware = createSagaMiddleware();
export const makeStore = (context) => {
	const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
	store.sagaTask = sagaMiddleware.run(rootsaga);
	store.__persistor = persistStore(store);

	return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
