// 导入react全家桶
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// 手册：https://reacttraining.com/react-router/web/example/auth-workflow

// 自定义私有路由高阶组件
const PrivateRoute = ({component: Component, ...props}) => {
 // 解构赋值 将 props 里面的 component 赋值给 Component
 return <Route {...props} render={() => {
     const token = localStorage.getItem('token' )
     if (token){ // 如果登录了, 返回正确的路由
         return <Component />
     } else { // 没有登录就重定向至登录页面
         return <Redirect to='/login' /> 
     }
 }}/>
}

// 导出
export default PrivateRoute