import { getRightList } from '../../../../api/index'
export const addRights = (params) => (dispatch) => {
    getRightList('list').then(
        res => {
            // console.log(res.data, 111)
            dispatch({
                type: 'RIGHT',
                payload: res.data
            })
        }
    )
}