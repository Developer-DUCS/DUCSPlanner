const express = require("express");
const conn = require("./mysqldb");
const app = express()
const port = 3210; //originally 3210
const bodyParser = require("body-parser");
//const session = require("./session"); //used for persistent storage
app.use(express.static('App.js'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const router = express.Router();

router.use("/api/auth", require("./api/auth"));
router.use("/api/courses", require("./api/courses"));
//router.use("/api/sessionRoutes/get-session",require("./api/sessionRoutes/get-session"));
//router.use("/api/sessionRoutes/store-data", require("./api/sessionRoutes/store-data"));
//router.use("/api/sessionRoutes", require("./api/sessionRoutes"));

app.use(router);

app.listen(port, (err) => {
    if (err)
        console.log("Server startup failed.");
    else
        console.log(`Server listening on port ${port}`);
});

app.get('/login', function (req, res) {
    conn.query('select * from PlanItUsers', function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(rows);
            //req.session.rows;
            //console.log(req.session.rows)
            res.send(rows);
        }
    });
});

/*
HOW TO START SERVER:
yarn startserv
new terminal
yarn start
*/