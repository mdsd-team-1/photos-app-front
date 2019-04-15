//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import es_ES from 'antd/lib/locale-provider/es_ES';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import 'moment/locale/es';

//Components
import App from './app/App';

//Subcomponents
import * as serviceWorker from './serviceWorker';
import store from './app/store/store'

//Styles
import './app/styles/index.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={'/Inspektor/'}>
            <LocaleProvider locale={es_ES}>
                <App />
            </LocaleProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();