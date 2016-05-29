import {
    STATUS_INIT,
    STATUS_READY,
    STATUS_ACTIVE,
    INIT,
    PRESS_BUTTON,
    RELEASE_BUTTON,
    SET_BUTTON_STATUS,
    UPDATE_RESULT
} from '../actions/index'

const getInitStatus = (row, col) => {
    return Array(row).fill(1).map((_,i)=>Array(col).fill(1).map((_,j)=>(
        isMid(row, col, i, j) ? STATUS_READY : STATUS_INIT
    )))
}

export const isMid = (row, col, i, j) => i===parseInt(row/2) && j===parseInt(col/2) 

const nextStatus = (type, status, keepActive) => {
    const statusMap = {};
    switch (type) {
        case PRESS_BUTTON:
            statusMap[STATUS_INIT] = STATUS_INIT
            statusMap[STATUS_READY] = STATUS_ACTIVE
            statusMap[STATUS_ACTIVE] = STATUS_ACTIVE
            break;
        case RELEASE_BUTTON:
            statusMap[STATUS_INIT] = STATUS_INIT
            statusMap[STATUS_READY] = STATUS_READY
            statusMap[STATUS_ACTIVE] = keepActive ? STATUS_READY : STATUS_INIT
            break;
    }
    return statusMap[status]
}

export default (state=getInitStatus(3,3), action) => {

    const { type, row, col } = action

    switch (type) {
        case INIT:
            return getInitStatus(row, col)

        case PRESS_BUTTON:
        case RELEASE_BUTTON:
            return Object.assign([], state.map((item,i)=>item.map(
                 (status,j)=>(i===row && j===col ? 
                      nextStatus(type, status, isMid(state.length,state[0].length,i,j)) : status)
            )))

        case SET_BUTTON_STATUS:
            return Object.assign([], state.map((item,i)=>item.map(
                 (status,j)=>(i===row && j===col ? action.status : status)
            )))

        default:
            return state
    }

}
