const path = require('path')
const usersData = require('./users.json')
const usersStatisticsData = require('./users_statistic.json')
const dbPath = path.resolve(__dirname, 'db.sqlite3')
const chunkSize = 50;
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

knex.schema
    .hasTable('users')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('users', (table) => {
                table.integer('id')
                table.string('first_name')
                table.string('last_name')
                table.string('email')
                table.string('gender')
                table.string('ip_address')
                //adding all users data into db
                knex.batchInsert('users', usersData, chunkSize)
                    .then(() => {
                        console.log('Rows added');
                    })
                    .catch(err => {
                        console.log('ERROR');
                    })
            })
                .then(() => {
                    console.log('Table \'Users\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })
    .then(() => {
        console.log('Users table added to db')
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    })

knex.schema
    .hasTable('usersStatistics')
    .then((exists) => {
        if (!exists) {
            // {"user_id":33,"date":"2019-10-02","page_views":260,"clicks":565}
            return knex.schema.createTable('usersStatistics', (table) => {
                table.integer('user_id')
                table.date('date')
                table.integer('page_views')
                table.integer('clicks')
                //adding all users statistic data into db
                knex.batchInsert('usersStatistics', usersStatisticsData, chunkSize)
                    .then(() => {
                        console.log('Rows added');
                    })
                    .catch(err => {
                        console.log('ERROR');
                    })
            })
                .then(() => {
                    console.log('Table \'usersStatistics\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })
    .then(() => {
        console.log('usersStatistics table added to db')
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    })


module.exports = knex;