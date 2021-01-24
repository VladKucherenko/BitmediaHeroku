import { createSelector } from 'reselect'
const getStatisticData = (state) => state.usersStatistic

export const getUserStatistic = createSelector(getStatisticData, getStatisticData => getStatisticData.userStatistic)

export const getFromData = createSelector(getStatisticData, getStatisticData => getStatisticData.from)

export const getToData = createSelector(getStatisticData, getStatisticData => getStatisticData.to)

