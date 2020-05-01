import { getRoles, editRoles,searchRoles } from '../../../../api/index'
export const showRoles = (params) => (dispatch) => {
    getRoles().then(
        res => {
            // console.log(res.data, 22222111)
            dispatch({
                type: 'GETROLES',
                payload: res.data
            })
        }
    )
}
export const editRole = (id, data) => (dispatch) => {
    editRoles(id, data).then(
        res => {
            // console.log(res.data, 22222111)
            dispatch({
                type: 'EDITROLES',
                payload: res.data
            })
        }
    )
}

export const searcher = (id) => (dispatch) => {
    searchRoles(id).then(
        res => {
            // console.log(res, 22222111)
            dispatch({
                type: 'SEARCHROLES',
                payload: res.data.data
            })
        }
    )
}
export const shootid = (id) => (dispatch) => {
    dispatch({
        type: 'EDITID',
        payload: id
    })
}