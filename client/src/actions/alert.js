/* Action file for all alerts */

// Constants
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../constants/constant';

export const setAlert = (alertType, msg) => dispatch => {
    const id = Date.now();
    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            alertType,
            msg
        }
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 3000);
}