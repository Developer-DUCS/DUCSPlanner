const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conn = require("../mysqldb");
const router = require("express").Router();
const bodyParser = require("body-parser");
const conf = require("../configuration/config.json")

let secret = conf.secret;

router.use(bodyParser.json());

router.post('/login', (req, res) => {
    conn.query(`select * from PlanItUsers where Email = "${req.body.Email}";`, function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else if (rows.length == 0) {
            return (res.status(404).json({ message: 'User not found' }));
        }
        else {
            for (let l = 0; l < rows.length; l++) {
                if (req.body.Email == rows[l].Email && bcrypt.compareSync(req.body.Password, rows[l].Password)) {
                    const token = jwt.sign({
                        UserId: rows[l].UserId, Email: req.body.Email, Role: rows[l].Role, Department: rows[l].Department,
                        YearStarted: rows[l].Year_Started, Fname: rows[l].Fname, Lname: rows[l].Lname
                    }, secret, { expiresIn: '1h' });
                    console.log(rows[l].Fname, rows[l].Lname);
                    //req.session.userInfo = rows[l];
                    return (res.status(200).json({
                        message: "User logged in", "token": token, "Role": rows[l].Role, "fname": rows[l].Fname,
                        "lname": rows[l].Lname
                    }));
                }
            }
            return res.status(401).json({ message: "invalid credentials" });
        }
    });
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    conn.query(`select Email from planitusers where Email = "${req.body.Email}"`, function (error, rows, fields) {
        if (error) {
            return res.status(500).json({ message: 'Error try again later' })
        }
        if (rows.length != 0) {
            return res.status(409).json({ message: 'User Already registered' })
        }
        else {
            if (req.body.Password != req.body.ConfPassword) {
                return res.status(509).json({ message: 'Passwords do not match' })
            }
            else {
                // //  Create a hash for the submitted password
                var hashPass = bcrypt.hashSync(req.body.Password, 10);
                var query = "INSERT INTO PlanItUsers (Email, Password, Fname, Lname, Role, Department, Year_Started)";
                //replace req.body.password with password when bcrypt works
                var values = " VALUES('" + req.body.Email + "','" + hashPass + "','" + req.body.Fname + "','" + req.body.Lname + "','" + req.body.Role + "','" + 'TEMPDepartment' + "'," + "YEAR(NOW())" + ")";

                conn.query(query + values, (err) => {
                    if (err) {
                        console.log("Error: ", err);
                    } else {
                        res.status(201).json({ message: "User created.", newPass: hashPass });
                    }
                });
            }
        }
    });
});

module.exports = router;