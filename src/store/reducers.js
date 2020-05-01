// 导入模块
import { combineReducers } from 'redux-immutable';

// 导入reducer
// import {reducer as 模块名Reducer}from '../pages/模块名/store';

//登录
import LoginReducer from '../pages/login/store';

//商品管理
import GoodsListReducer from '../pages/goods/goodslist/store';
import GoodsCateReducer from '../pages/goods/goodsCate/store';

//用户管理
import {reducer as User} from '../pages/users/store';


//订单管理
import OrderListReducer from '../pages/orders/store';

//权限管理
import roleReducer from '../pages/rights/role/store/index'
import rightReducer from '../pages/rights/right/store/index'
// import {reducer as LoginReducer}from '../pages/login/store';

// 合并reducer
const reducers = combineReducers({
    // 模块小驼峰名:模块名Reducer大驼峰, 
    LoginReducer,
    goodslist:GoodsListReducer,
    goodscate:GoodsCateReducer,
    user:User,
    rightReducer,
    roleReducer,
    getOrders:OrderListReducer
})

// 导出
export default reducers