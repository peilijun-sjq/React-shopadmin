//导入异步请求
import {
  getGoodsCateList ,
  selectGoodsCate
  //修改
} from '../../../../api/index';

//导入变量
import * as constants from './actionTypes';

//展示商品分类数据
export const getCategoriesList = (params) => dispatch => {
  getGoodsCateList(params)
  .then(res => {
      if (res.meta.status === 200)
      {
        dispatch({  
            type: constants.GET_CATEGORIES,
            payload:{
              data:res.data
            }
        })
      }
  })
}  

//搜索商品分类数据
export const selectCate = (value) => dispatch => {
  selectGoodsCate(value)
  .then(res => {
      if (res.meta.status === 200)
      {
        dispatch({  
            type: constants.GET_CATEADD,
            payload:{
              data:{
                result:[res.data]
              }
            }
        })
      }
  })
}  


export const changeSpinning=(dispatch)=>{
  return dispatch=>{
      dispatch({
          type:constants.CHANGE_N
      })
  }
}


// ###相关参考代码

// import {fromJS} from 'immutable';
// import axios from '../../../axios';
// import * as constants from './actionTypes';

// //查询action
// const changeSearchTable = (rows,total)=>({
//   type:constants.CHANGE_SEARCH_TABLE,
//   rows:fromJS(rows),
//   total
// });

// //重置action
// const tableListReset = (rows,total)=>({
//   type:constants.RESET_TABLE_LIST,
//   rows:fromJS(rows),
//   total
// });

// // 列表分页
// const pageChangeData = (rows,total,page)=>({
//   type:constants.PAGE_CHANGE_DATA,
//   rows:fromJS(rows),
//   total:total,
//   page:page
// });

// //页面加载，获取表格的数据
// export const addTableList = (data)=>{
//   console.log(data);
  
//   return (dispatch)=>{
//     try {
//       axios.post(data).then((res)=>{
//         if(res.rows!=null&&res.rows.length){
//           dispatch(pageChangeData(res.rows,res.total, data.data.params.page))
//         }else{
//           //当前page没有值时查询数据page计算1 避免前台无数据
//           data.data.params.page=1
//           axios.post(data).then((newres)=>{
//             // 处理空值状态
//              if(newres){
//                dispatch(pageChangeData(newres.rows,newres.total,1))
//              }
//            },(error)=>{
//              console.log(error);
//            })
//         }
//       },(error)=>{
//         console.log(error);
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// //查询
// export const addSearchTable = (data)=>{
//   return (dispatch)=>{
//     try {
//       axios.post(data).then((res)=>{
//         if(res){
//           dispatch(changeSearchTable(res.rows,res.total))
//         }
//       },(error)=>{
//         console.log(error);
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// //重置
// export const resetTableList = (data)=>{
//   return (dispatch)=>{
//     try {
//       axios.post(data).then((res)=>{
//         if(res){
//           dispatch(tableListReset(res.rows,res.total))
//         }
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// // 分页查询
// export const addPageData = (data)=>{
//   return (dispatch)=>{
//     try {
//       axios.post(data).then((res)=>{
//        // 处理空值状态
//         if(res.rows!=null&&res.rows.length){
//           dispatch(pageChangeData(res.rows,res.total, data.data.params.page))
//         }else{
//           //当前page没有值时查询数据page计算1 避免前台无数据
//           data.data.params.page=1
//           axios.post(data).then((newres)=>{
//             // 处理空值状态
//              if(newres){
//                dispatch(pageChangeData(newres.rows,newres.total,1))
//              }
//            },(error)=>{
//              console.log(error);
//            })
//         }
//       },(error)=>{
//         console.log(error);
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

