import { createSelector } from 'reselect'
const getUsersData = (state) => state.usersList

// export const getUsersList = (state) => {return getUserData(state).usersList}
export const getUsersList = createSelector(getUsersData, usersData => usersData.usersList)
export const getTotalUsersCount = createSelector(getUsersData, usersData => usersData.totalUsersCount)
export const getCurrentPage = createSelector(getUsersData, usersData => usersData.currentPage)
export const getPortionCount = createSelector(getUsersData, usersData => usersData.portionCount)
