import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../saga";
import linksReducer from "../reducers/LinksReducer";
import foldersReducer from "../reducers/FoldersReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    links: linksReducer,
    folders: foldersReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;