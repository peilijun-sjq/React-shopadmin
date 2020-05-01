import {postLogin} from '../../../api';
import {LOGIN_IN} from './actionType';
import {message} from 'antd';
//登录异步请求
export const loginInCreator=(params)=>{
    return (dispatch)=>{
        postLogin(params)
        .then(res=>{
            if(res.meta.status!==200){
                message.error(res.meta.msg)
            }else{
                const data=res.data
                message.success('登陆成功');
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('uid', res.data.id)
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type:LOGIN_IN,
                    data
                })
            }
        })
    }
}

