import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);