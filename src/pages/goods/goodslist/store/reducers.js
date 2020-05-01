import {fromJS} from 'immutable';
import {GOODS_LIST,CHANGE_N} from './actionType';

const defaultState = fromJS({
  goodsList:{},
  spinning:true
});

export default (state=defaultState, action) => {
  switch(action.type)
  {
    case GOODS_LIST:
      const data=action.data
      // return state.set('goodsList',fromJS({data}))
      let a=state.set('goodsList',fromJS(data))
      return a.set('spinning',false)
    case CHANGE_N:
      return state.set('spinning',true)
      // return state.set('goodsList',data)
    default:
      return state;         
  }
}
