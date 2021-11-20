const conn = require("../mysqldb");
const router = require("express").Router();
const bodyParser = require("body-parser");
const conf = require("../configuration/config.json");
//const { RecyclerViewBackedScrollViewBase } = require("react-native");

router.use(bodyParser.json());

//Test router
router.post('/courses', (req, res) => {
    console.log(`Courses called for ${req.body.courseCode}`);
    let qry = `SELECT * FROM Courses WHERE CoursePrefix IN (${req.body.courseCode});`;
    conn.query(qry, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        else {
            let courseList = [];
            rows.forEach((rows) => {
                let course = {
                    CoursePrefix: rows.CoursePrefix,
                    CourseName: rows.CourseName,
                    CourseCode: rows.CourseCode,
                    Semester: rows.Semester,
                    CreditHours: rows.CreditHours
                }
                courseList.push(course);
            })
            return (res.status(200).json({ Courses: courseList }));
        }

    })
})
module.exports = router;