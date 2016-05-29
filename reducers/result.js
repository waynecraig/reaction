import { UPDATE_RESULT } from '../actions/index'

export default (state='', action) => {

    switch (action.type) {

        case UPDATE_RESULT:
            return action.result

        default:
            return state
    }

}
