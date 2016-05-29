export const STATUS_INIT = 'STATUS_INIT'
export const STATUS_READY = 'STATUS_READY'
export const STATUS_ACTIVE = 'STATUS_ACTIVE'

export const INIT = 'INIT'
export const init = (row, col) => ({
    type: INIT,
    row,
    col
})

export const PRESS_BUTTON = 'PRESS_BUTTON'
export const pressButton = (row, col) => ({
    type: PRESS_BUTTON,
    row,
    col
})

export const RELEASE_BUTTON = 'RELEASE_BUTTON'
export const releaseButton = (row, col) => ({
    type: RELEASE_BUTTON,
    row,
    col
})

export const SET_BUTTON_STATUS = 'SET_BUTTON_STATUS'
export const setButtonStatus = (row, col, status) => ({
    type: SET_BUTTON_STATUS,
    row,
    col,
    status
})

let timer = null
let startTs = 0
export const startRound = () => {

    cancelRound()
    const rt = Math.floor(Math.random() * 5000)
    const ri = Math.floor(Math.random() * 8)
    const i = ri >= 4 ? ri + 1 : ri
    const row = Math.floor(i / 3)
    const col = i % 3
    startTs = 0

    return dispatch => {
        timer = setTimeout(()=>{
            startTs = Date.now()
            dispatch(setButtonStatus(row, col, STATUS_READY))
            timer = null
        }, rt)
    }
}

export const cancelRound = () => {
    if (timer) {
        clearTimeout(timer)
        timer = null
        startTs = 0
    }
}

export const UPDATE_RESULT = 'UPDATE_RESULT'
export const endRound = () => {
    if (startTs) {
        const ts = startTs
        startTs = 0
        return {
            type: UPDATE_RESULT,
            result: Date.now() - ts
        }
    } else {
        return {
            type: null
        }
    }
}
