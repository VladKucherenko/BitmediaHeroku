import { usersAPI } from "../api/api";

const GETUSERSTATISTIC = 'SN/USER-STATISTIC/GET-USER-STATISTIC'
const SETFROMTO = 'SN/USER-STATISTIC/SET-FROM-TO'

let initialState = {
    userStatistic: {},
    from: '2019-10-01',
    to: '2019-10-31'
};

export const usersStatistic = (state = initialState, action) => {
    switch (action.type) {
        case GETUSERSTATISTIC: {
            return {
                ...state,
                userStatistic: action.userStatistic
            }
        }
        case SETFROMTO: {
            return {
                ...state,
                from: action.from,
                to: action.to
            }
        }
        default: {
            return state
        }
    }
}


export const actions = {
    getUserStatistic: (userStatistic) => ({ type: GETUSERSTATISTIC, userStatistic }),
    setFromTo: (from, to) => ({ type: SETFROMTO, from, to })
}

export const getUsersStatisticsThunk = (id, from, to) => async (dispatch, getState) => {
    try {

        let response = await usersAPI.getUserStatistic(id, from, to)
        if (response.resultCode === 0) {
            dispatch(actions.setFromTo(response.from, response.to))
            dispatch(actions.getUserStatistic(response.userStatistic))
        } else {
            throw 'myException';
        }
    }
    catch (e) {
        alert(e.response.data.message);
        dispatch(actions.setFromTo('2019-10-01', '2019-10-31'))
        dispatch(getUsersStatisticsThunk(id, getState().from ,getState().to));
    }

}