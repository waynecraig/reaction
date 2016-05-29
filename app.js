import React, { Component, PropTypes } from 'react';
import Index from './components/index';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/index'

const loggerMiddleware = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

const wrap = document.createElement('div');
document.body.appendChild(wrap);

render(
    <Provider store={store}>
        <Index/>
    </Provider>, 
    wrap
);
