import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

/*  Con composeEnhancers podemos crear múltiples middlewares, ya que en este momento solamente tenemos el de
    redux-devtools-extension pero necesitamos también thunk */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

/*  Aquí es en donde hacemos la configuración del middleware thunk y redux-devtools-extension para poder realizar 
    los llamos de las acciones asíncronas mediante thunk y con redux-devtools-extension ver en el navegador redux*/
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);