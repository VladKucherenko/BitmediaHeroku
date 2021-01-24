const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const router = require('./routes/users-route')
const app = express()

const path = require('path');
// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
// // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client\build', 'index.html'));
//   });
// }

const port = process.env.PORT || 5000;

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/bitmedia', router)

app.use(function (err, req, res, next) {
    // console.error(err.stack)
    res.status(500).send('Something is broken.')
})


// Implement 404 error route
app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that.')
})

app.listen(port, () => console.log('Server working'))

// json.dumps()