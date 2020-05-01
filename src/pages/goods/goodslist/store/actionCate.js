import {goodsList,deleteGoods} from '../../../../api';
import {GOODS_LIST,CHANGE_N} from './actionType';
import {message} from 'antd';

//商品列表
export const getGoodsList=(pagenum,pagesize,query)=>{
    return (dispatch)=>{
        goodsList({
            pagenum:pagenum,
            pagesize:pagesize,
            query:query,
        })
        .then(res=>{
            if(res.meta.status!==200){
                console.log('操作失败')
            }else{
                const data=res.data
                dispatch({
                    type:GOODS_LIST,
                    data,
                })
            }
        })
    }
}

//商品删除
export const deleteGoodsItem=(goodsId)=>{
    return (dispatch)=>{
        deleteGoods(goodsId)
        .then(res=>{
            if(res.meta.status!==200){
                console.log('操作失败')
            }else{
                message.success('操作成功')
            }
        })
    }
}


export const changeSpinning=(dispatch)=>{
    return dispatch=>{
        dispatch({
            type:CHANGE_N
        })
    }
}
