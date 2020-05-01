import { fromJS } from 'immutable';
const initState = fromJS({
    roledata:{},
    roleid:'',
    editdata:{}
})

// const initState = fromJS([])
const roleReducer=(state=initState,action)=>{
    switch(action.type){
        case'GETROLES':
        let data=action.payload
        // console.log(22,data) 
        return state.update('roledata',set=>set=fromJS({data}))

        case'SEARCHROLES': 
        let data3=action.payload
        const json = JSON.parse(JSON.stringify(data3).replace(/roleId/g,"id"));
        // console.log(11,json);
        
        return state.update('roledata',set=>set=fromJS({data:[json]}))

        case'EDITROLES': 
        let data2=action.payload
        return state.update('roledata',set=>set=fromJS({data2}))

        case'EDITID': 
        let data4=action.payload
        return state.update('roleid',set=>set=fromJS({data4}))
        default:break
    }
    return state
}
export default roleReducer