const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conn = require("../mysqldb");
const router = require("express").Router();
const bodyParser = require("body-parser");
const conf = require("../configuration/config.json")

let secret = conf.secret;

router.use(bodyParser.json());

router.post('/', (req, res) => {
    conn.query('select * from UserAccountsTest', function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            // password hash
            for (let l = 0; l < rows.length; l++) {
                if (req.body.Email == rows[l].Email && req.body.Password == rows[l].Password) {
                    const token = jwt.sign({
                        UserId: rows[l].UserId, Email: req.body.Email, Role: rows[l].Role, Department: rows[l].Department,
                        YearStarted: rows[l].Year_Started, Fname: rows[l].Fname, Lname: rows[l].Lnast
                    }, secret, { expiresIn: '1h' });
                    return (res.status(200).json({ message: "user logged in", "token": token, "Role": rows[l].Role }));
                }
                /*bcrypt.compare(req.body.Password, rows[l].Password, (err, compareRes) => {
                    if (err) { // error while comparing
                        res.status(502).json({ message: "error while checking user password" });
                    } else if (compareRes) { // password match
                        const token = jwt.sign({ Email: req.body.Email }, 'secret', { expiresIn: '1h' });
                        res.status(200).json({ message: "user logged in", "token": token });
                    } else { // password doesnt match
                        res.status(401).json({ message: "invalid credentials" });
                    };
                });    FOR PASSWORD HASHING     */
            }
            return (res.status(404).json({ message: "User not found" }));
        }
    });
});

module.exports = router;