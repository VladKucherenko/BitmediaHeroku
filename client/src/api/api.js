import axios from 'axios';

export const usersAPI = {
    getUsers(page, count = 10) {
        return axios.get(`/users-list?${page && `page=${page}`}&${count && `count=${count}`}`)
            .then(response => response.data)
    },
    getUserStatistic(id, from, to) {
        return axios.get(`/user/${id}?${from && `from=${from}`}&${to && `to=${to}`}`)
            .then(response => response.data)
    }
}