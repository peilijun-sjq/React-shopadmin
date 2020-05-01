// 导入模块
import thunk from 'redux-thunk'		               
import {createStore, applyMiddleware} from 'redux' 
import {composeWithDevTools} from "redux-devtools-extension"

// 导入reducer
import reducers from './reducers';

// 创建仓库
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

// 导出仓库
export default store