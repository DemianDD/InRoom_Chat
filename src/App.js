import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import './custom.css'
import socket from './socket';

const userInfo = socket;
export default () => (
    <BrowserRouter>
        <Route exact path='/' component={Home} />
    </BrowserRouter>
);
