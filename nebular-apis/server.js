var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const http = require('http');

const port = process.env.PORT || 3004

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// const corsOptions = {
//     origin: '*'
// }
// app.use(cors(corsOptions));
const whitelist = ['capacitor://localhost', 'http://localhost', 'http://localhost:4200', 'http://localhost:2100', 'http://18.169.95.14:3011', 'http://18.169.95.14', 'http://18.130.155.189', 'https://52.4.73.230:3012', 'http://52.4.73.230', 'http://52.4.73.230:3012']
const corsOptions = {
    origin: function (origin, callback) {
        //console.log('..................>>>>>>>>>>>>>', origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            // callback(new Error('Not allowed by CORS'))
            callback(JSON.stringify({ data: [], error: true }), true)

        }
    }
}

const routes = require('./app/routes/appRoutes')
// app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello Nebulat_dsh.js');

})
app.use('/', routes);
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})
