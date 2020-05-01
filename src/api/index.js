//1.引入axios模块
import axios from 'axios'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'
//2.全局配置
// axios.defaults.baseURL = 'http://106.13.49.62:8888/api/private/v1'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    NProgress.start()
    //1.获取token
    var token = localStorage.getItem('token') || sessionStorage.getItem('token')
    //2.判断
    if (token) {
        //设置请求头（后期请求接口 http请求头携带Authorization参数）
        config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})
// var token = localStorage.getItem('token') ||  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJpZCI6MCwiaWF0IjoxNTc4MDM1NTUxLCJleHAiOjE1NzgxMjE5NTF9.2dS6e6PV4BHPTNsp3Q3qFwFXCNY5Iqvg2t2gjFqzwdM'
// axios.defaults.headers.common['Authorization'] = token
// 语法
// GET      axios.get(请求路径，{params: 数据对象})   
//          axios.get(请求路径，{params: {uname:'aaa', pwd:'bbb'}})   
// POST     axios.post(请求路径，数据对象)   
// PUT      axios.put(请求路径，数据对象)   
// DELETE   axios.delete(`请求路径/${id}`)   

// 统一：HTTP请求动词+模块名

//登录
export const postLogin = postData => { // {username:'', password}
    return axios.post('login', postData).then(res=>res.data)
}

// ###################################################用户
//用户列表
export const usersList = params => { //{query:'',pagenum:'',pagesize:''}
    return axios.get('users',{params:params}).then(res=>res.data)
}
//用户添加
export const insertUsers = params => { //{query:'',pagenum:'',pagesize:''}
    return axios.post('users',params).then(res=>res.data)
}
//用户删除
export const deleteUsers = id => { //{query:'',pagenum:'',pagesize:''}
    return axios.delete(`users/${id}`).then(res=>res.data)
}
//用户修改
export const updateUsers = (id,params) => { //{query:'',pagenum:'',pagesize:''}
    return axios.put(`users/${id}`,params).then(res=>res.data)
}
//获取角色列表
export const getUsersRole = params => {  
    return axios({
        method:"get",
        url:"roles",
        params:params
    }).then(res => {
        return res.data
    })
}
//分配用户角色
export const changeUsersRole =(uId,rid ) => axios.put(`users/${uId}/role`,{rid}).then(res => {
    return res.data
})
//修改用户状态
// export const changeUser = params => { //{query:'',pagenum:'',pagesize:''}
//     return axios.put(`users/${params.uid}/state/${params.type}`).then(res=>res.data)
// }
//修改用户状态
export const changeUser = (id,state) => { //{query:'',pagenum:'',pagesize:''}
    return axios.put(`users/${id}/state/${state}`).then(res=>res.data)
}





// ###################################################商品列表
//商品列表
export const goodsList = params => { //{query:'',pagenum:'',pagesize:''}
    return axios.get('goods',{params:params}).then(res=>res.data)
}
// 商品添加
export const addGoods=params=>{
    return axios.post('goods',params).then(res => res.data)
}
// 商品修改
export const updateGoods=(id,params)=>{
    return axios.put(`goods/${id}`,params).then(res => res.data)
}
// 商品删除
export const deleteGoods=id=>{
    return axios.delete(`goods/${id}`).then(res => res.data)
}



// ###################################################商品分类
// 商品分类搜索
export const selectGoodsCate= catId =>{
    return axios.get(`categories/${catId}`).then(res => res.data)
}
// 商品分类列表
export const getGoodsCateList=params=>{
    return axios.get('categories',{params:params}).then(res => res.data)
}
// 商品分类添加
export const addGoodsCate=params=>{
    return axios.post('categories',params).then(res => res.data)
}
// 商品分类删除
export const deleteGoodsCate=catId=>{
    return axios.delete(`categories/${catId}`).then(res => res.data)
}
// 商品分类修改
export const setGoodsCate=(catId,params)=>{
    return axios.put(`categories/${catId}`,params).then(res => res.data)
}


// ###################################################数据统计
export const getDataList = params => {
    return axios.get('reports/type/'+params).then(res => res.data)
}


// ###################################################订单
// 订单列表
export const getOrders = getData => { // 
    return axios.get('orders',{params:getData}).then(res=>res.data)
}
//修改用户状态信息
export const editOrder = (id,params) => { 
    return axios.put(`orders/${id}`,params).then(res => res.data)
}
//查看用户信息
export const viewOrder = (id,params) => { 
    return axios.get(`orders/${id}`,params).then(res => res.data)
}



// ###################################################权限列表
//权限列表
export const getRightList = (type) => {
    return axios.get(`rights/${type}`).then(res => res.data)
}

// ###################################################角色列表
//角色列表
export const getRoles = (params = {}) => { //params {query, pagesize, pagenum}
    return axios.get('roles', params).then(res => res.data
    )
}
//添加角色
export const addRoles = (data = {}) => {
    return axios.post(`roles`, data)
        .then(res => { return res })
        .catch(err => console.log(err))
}
//编辑提交角色
export const editRoles = (id, data) => {
    return axios.put(`roles/${id}`, data)
        .then(res => {
            // console.log(res);
            return res
        })
        .catch(err => console.log(err))
}
// 角色列表删除接口
export const deleteRoles = (id) => {
    return axios.delete(`roles/${id}`)
        .then(res => {
            // console.log(res);
            return res.data
        })
        .catch(err => console.log(err))
}
//删除角色指定权限
export const deleteRole = (roleId,rightId) => {
    return axios.delete(`roles/${roleId}/rights/${rightId}`).then(res => res.data)
}
// 根据ID查询角色
export const searchRoles = (id) => {
    return axios.get(`roles/${id}`)
        .then(res => {
            // console.log(res);
            return res
        })
        .catch(err => console.log(err))
}
//角色授权
export const giveRoleRights = (roleId,data) => {
    return axios.post(`roles/${roleId}/rights`,{rids: data})
        .then(res => {
            // console.log(res);
            return res.data
        })
        .catch(err => console.log(err))
}






