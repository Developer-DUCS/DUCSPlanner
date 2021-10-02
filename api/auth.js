const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conn = require("../mysqldb");
const router = require("express").Router();
const bodyParser = require("body-parser");
const conf = require("../configuration/config.json")

let secret = conf.secret;

router.use(bodyParser.json());

router.post('/login', (req, res) => {
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
router.post('/signup', (req, res) => {
    conn.query('select Email from UserAccountsTest where Email = ?', [req.body.Email], function (error, rows, fields) {
        if (error) {
            return res.status(500).json({
                message: 'Error try again later'
            })
        }
        if (rows.length != 0) {
            return res.status(409).json({
                message: 'User Allready registered'
            })
        } else {
            let password;
            // //  Create a hash for the submitted password
            // //  bcrypt.hash(req.body.password, null, null, function (err, hash) {
            // //     password = hash;
            // // }
            // );

            var query = "INSERT INTO UserAccountsTest (Email, Password, Fname, Lname, Role, Department, Year_Started)";
            //replace req.body.password with password when bcrypt works
            var values = " VALUES('" + req.body.Email + "','" + req.body.Password + "','" + req.body.Fname + "','" + req.body.Lname + "','" + req.body.Role + "','" + 'TEMPDepartment' + "'," + "YEAR(NOW())" +")";

            conn.query(query + values, (err) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    res.status(201).json({
                        success: "User created."
                    });
                }
            });

        }
    });
});

module.exports = router;