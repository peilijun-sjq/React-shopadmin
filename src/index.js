import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
// import { ConfigProvider } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
// 导入状态
import store from './store/index'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
