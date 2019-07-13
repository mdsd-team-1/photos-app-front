//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import es_ES from 'antd/lib/locale-provider/es_ES';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import 'moment/locale/es';

//Components
import App from './app/components/App';

//Subcomponents
import * as serviceWorker from './app/configuration/serviceWorker';
import store from './app/actions/store/store'

//Styles
//import './app/styles/index.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
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