import { fromJS } from 'immutable';
const initState = fromJS({
    data:{}
})

// const initState = fromJS([])
const rightReducer=(state=initState,action)=>{
    switch(action.type){
        case'RIGHT': 
            //  state=state.push(action.payload)
            //  console.log(state,'state');    
        // return state.push(action.payload)

        let data=action.payload
        return state.update('data',set=>set=fromJS({data}))
        default:break
    }
    return state
}
export default rightReducer