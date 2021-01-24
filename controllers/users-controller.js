const { where } = require("../db");
const knex = require("../db");
const usersDataArray = require('./../users.json')

exports.usersList = async (req, res) => {

    let { page = 1, count = 10 } = req.query;
    let lowerLimit = page * count - count + 1;
    let higherLimit = page * count;
    const intPage = Number.isInteger(parseInt(page))
    const intCount = Number.isInteger(parseInt(count))
    const maxPage = usersDataArray.length / count;
    if (count > 50) {
        return res.status(400).json({ message: `Query params 'count' has limit of 50`, resultCode: 1 })
    } 
    else if (page > maxPage) {
        console.log('Max page error')
        return res.status(400).json({ message: `Query params 'page' is larger than maxPage=${maxPage}(maxPage = existing pages)`, resultCode: 1 })
    }
    else if ( intPage && intCount) {
        
        await knex.select('users.id', 'users.first_name',
            'users.last_name', 'users.email', 'users.gender',
            'users.ip_address')
            .sum('usersStatistics.page_views as totalPageViews')
            .sum('usersStatistics.clicks as totalClicks')
            .from('users')
            .join('usersStatistics', 'users.id', '=', 'usersStatistics.user_id')
            .groupBy('users.id')
            .whereBetween('id', [lowerLimit, higherLimit])
            .then((userData) => {
                // console.log(userData);
                res.json({ usersList: userData, totalUsersCount: usersDataArray.length, resultCode: 0 })
            })
            .catch(err => {
                res.json({ message: `There was an error retrieving data: ${err}`, resultCode: 1 })
            })
    } 
     else {
        console.log('Params are incorrect')
        return res.status(400).json({ message: `Incorrect query params`, resultCode: 1 })
    }
}

//2019-10-29
// /bitmedia/user/:id
exports.usersStatistic = async (req, res) => {
    let viewsArray = []
    let clicksArray = []
    let dateArray = []
    for (let index = 0; index < 31; index++) {
        if(index < 9) dateArray.push(`2019-10-0${index+1}`)
         else dateArray.push(`2019-10-${index+1}`)
        clicksArray[index] = 0
        viewsArray[index] = 0
    }
    let { from = '2019-10-01', to = '2019-10-31' } = req.query;
    let { id } = req.params;
    if(validateDate(from) && validateDate(to)) {
        await knex
        .select('users.first_name',
        'users.last_name','usersStatistics.user_id', 
        'usersStatistics.date', 'usersStatistics.clicks',
        'usersStatistics.page_views')
        .from('usersStatistics')
        .join('users', 'users.id', '=', 'usersStatistics.user_id')
        .where('usersStatistics.user_id', id)
        .orderBy('date', 'asc')
        .then(userData => {
            // console.log(userData)
            let fullName = userData[0].first_name + ' ' + userData[0].last_name
            
            userData.forEach((user, indexUser) => {
                dateArray.forEach((date, indexDate) => {
                    if(date === user.date){
                        viewsArray[indexDate] = user.page_views;
                        clicksArray[indexDate] = user.clicks;
                    }
                })
            })
            
            let fromIndex = 0
            let toIndex = 0
            dateArray.forEach((date, index) => {
                if(date === from) fromIndex = index
                if(date === to) toIndex = index
            })
            dateArray = dateArray.filter((date, index) => {
                return (index >= fromIndex && index <= toIndex)
            })
            viewsArray = viewsArray.filter((view, index) => {
                return (index >= fromIndex && index <= toIndex)
            })
            clicksArray = clicksArray.filter((clicks, index) => {
                return (index >= fromIndex && index <= toIndex)
            })

            res.json({ userStatistic: {fullName, dateArray, viewsArray, clicksArray} , from, to, resultCode: 0})
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving data: ${err}`, resultCode: 1 })
        })
    } else{
        return res.status(400).json({ message: `Incorrect query params`,  resultCode: 1 })
    }
}

Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
};
const validateDate = (date) => {
    let newDate = new Date(date);
    return newDate.isValid()
}
//2019-10-29