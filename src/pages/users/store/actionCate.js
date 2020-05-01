// import {usersList} from '../../../api';
// import {USERS_LIST} from './actionType';
// export const getUsersList=(pagenum,pagesize,query)=>{
//     return (dispatch)=>{
//         usersList({
//             pagenum:pagenum,
//             pagesize:pagesize,
//             query:query,
//         })
//         .then(res=>{
//             if(res.meta.status!==200){
//                 console.log('操作失败')
//             }else{
//                 // console.log(res)
                
//                 const data=res.data
//                 dispatch({
//                     type:USERS_LIST,
//                     data
//                 })
//             }
//         })
//     }
// }



import * as constants from './actionType';
// 导入接口
import {usersList,changeUser,deleteUsers} from '../../../api/index'

export const changeSpinning=(dispatch)=>{
  return dispatch=>{
      dispatch({
          type:constants.CHANGE_N
      })
  }
}

// 获取用户列表
export const getUserData = (params)=>{
    return dispatch=>{
      let data;
      usersList(params).then(res => {
        if(res.meta.status === 200){
          data = res.data
          dispatch({
            type: constants.ARTS_GET,
            data
          })
        }  
      })
    }
}

// 更改用户状态
export const usersState = (id,state) => {
  return ()=>{
    // let data;
    changeUser(id,state).then(res => {
      if(res.meta.msg === 200){
        return true
      }  
    })
  }
}

// // 编辑用户
// export const editorUsers = (params) => {
//   return ()=>{
//     // let data;
//     updateUsers(params)
//   }
// }

// 用户删除
export const deleteUser = (id) => {
  return ()=>{
    deleteUsers(id)
  }
}
// 添加用户
// export const addUsers = (params) => {
//   return ()=>{
//     insertUsers(params).then(res => {
//       console.log(res)
//     })
//   }
// }


