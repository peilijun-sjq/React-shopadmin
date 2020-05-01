import {fromJS} from 'immutable';
import {GET_ORDERS} from './actionTypes';

const defaultState = fromJS({
  getOrders:{}
});

export default (state=defaultState, action) => {
  switch(action.type)
  {
    case GET_ORDERS:
      const data=action.data
      return state.update('getOrders',set=>set=data)
    default:
      return state;         
  }
}



// 相关参考代码

// import {fromJS} from 'immutable';
// import * as constants from './actionTypes';

// export default (state=defaultState,action)=>{
//   switch(action.type){
//       //查询
//     case constants.CHANGE_SEARCH_TABLE:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total
//       });
//       //分页
//     case constants.PAGE_CHANGE_DATA:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total,
//         page:action.page
//   });
//     default:
//       return state;        
//   }
// }

// 相关参考代码
// const defaultState = fromJS({
//   tableList:[],
//   total:''
// });

// export default (state=defaultState,action)=>{
//   switch(action.type){
//       //查询
//     case constants.CHANGE_SEARCH_TABLE:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total
//       });
//       //分页
//     case constants.PAGE_CHANGE_DATA:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total,
//         page:action.page
//   });
//     default:
//       return state;        
//   }
// }