

import {fromJS} from 'immutable';
import * as constants from './actionType';

const defaultState = fromJS({
  status:[],
  loading:true
});

export default (state=defaultState, action) => {
  switch(action.type)
  {
    case constants.ARTS_GET:
      let a=state.set('status',fromJS(action.data));
      return a.set('loading',false);
    case constants.CHANGE_N:
      return state.set('loading',true)
      // return state.set('status', action.data);
    // case constants.PAGE_CHANGE_DATA:
    //   return state.update('status', val =>val = action.data);
    default:
      return state;         
  }
}
