import { usersAPI } from "../api/api";

const GETUSERS = 'BITMEDIA/APP/GET-USERS-LIST';
const SETPAGE = 'BITMEDIA/APP/SET-CURRENT-PAGE';
const SETPORTION = 'BITMEDIA/APP/SET-PORTION-COUNT';

let initialState = {
    usersList: [],
    portionCount: 10,
    totalUsersCount: 0,
    currentPage: 1
};

export const usersList = (state = initialState, action) => {
    switch (action.type) {
        case GETUSERS:{
            return {
                ...state,
                usersList: action.usersList,
                totalUsersCount: action.totalUsersCount
            }
        }
        case SETPAGE:{
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SETPORTION:{
            return {
                ...state,
                portionCount: action.portionCount
            }
        }
        default:
            return state
    }
}

export const actions = {
    getUsers: (usersList, totalUsersCount) => ({type: GETUSERS, usersList, totalUsersCount}),
    changeCurrentPage: (currentPage) => ({type: SETPAGE, currentPage}),
    changePortionCount: (portionCount) => ({type: SETPORTION, portionCount})
}

export const getUsersThunk = (page, count) => async (dispatch, getState) => {

    try {
     
    let response = await usersAPI.getUsers(page, count)
    if (response.resultCode === 0){
        
        dispatch(actions.getUsers(response.usersList, response.totalUsersCount))
        
    }else{
        throw 'myException';
    }
     }
    catch (e) {
        alert(e.response.data.message); 
        dispatch(actions.changeCurrentPage(1))
        dispatch(actions.changePortionCount(10))
        dispatch(getUsersThunk(getState().currentPage, getState().portionCount))
     }
    
}