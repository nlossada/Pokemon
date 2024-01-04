import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

// CODE PARA CONFIGURAR EL STORE 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    // Permite hacer peticiones asíncronas:
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;

//tuve que instalar versiones anteriores de redux, react-redux y redux-thunk porque no funcionaban

// import { configureStore } from '@reduxjs/toolkit';
// import thunkMiddleware from 'redux-thunk';
// import reducer from './reducer'; // Asegúrate de importar tu reducer correctamente

// const store = configureStore({
//     reducer: reducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(thunkMiddleware),
//     devTools: process.env.NODE_ENV !== 'production',
// });

// export default store;