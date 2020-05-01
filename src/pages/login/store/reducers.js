import {fromJS} from 'immutable';
import {LOGIN_IN} from './actionType';

const defaultState = fromJS({
  username:localStorage.getItem('username')||'',
  token:localStorage.getItem('username')||'',
  loginStatus:false,
});

export default (state=defaultState, action) => {
  switch(action.type)
  {
    case LOGIN_IN:
      state.set('username',action.username)
      state.set('token',action.token)
      return state.set('loginStatus',true)
    default:
      return state;         
  }
}
