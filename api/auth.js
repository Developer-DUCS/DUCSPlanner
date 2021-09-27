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
            if (!rows) {
                return res.status(404).json({ message: "user not found" });
            } else {
                // password hash
                for (let l = 0; l < rows.length; l++) {
                    if (req.body.Username == rows[l].Username && req.body.Password == rows[l].Password) {
                        const token = jwt.sign({ Username: req.body.Username, Role: rows[l].Role, id: rows[l].id }, secret, { expiresIn: '1h' });
                        res.status(200).json({ message: "user logged in", "token": token, "Role": rows[l].Role });
                    }
                    /*bcrypt.compare(req.body.Password, rows[l].Password, (err, compareRes) => {
                        if (err) { // error while comparing
                            res.status(502).json({ message: "error while checking user password" });
                        } else if (compareRes) { // password match
                            const token = jwt.sign({ Username: req.body.Username }, 'secret', { expiresIn: '1h' });
                            res.status(200).json({ message: "user logged in", "token": token });
                        } else { // password doesnt match
                            res.status(401).json({ message: "invalid credentials" });
                        };
                    });    FOR PASSWORD HASHING     */
                }
            };
        }
    });
});

module.exports = router;