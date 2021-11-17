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
            console.log(courseList);
            return (res.status(200).json({ Courses: courseList }));
        }

    })
})
//skeleton code for creating a plan
router.post('/create', (req,res) => {
    console.log(`Courses to be pushed : ${req.body}`);
    var query = conn.query(`Insert into StudentCourseTable (UserId, CoursePrefix, CourseCode, PlanYear, PlanSemester ) values (?,?,?,?,?)`,[req.body.uID, req.body.CP,req.body.CC,req.body.PY, req.body.PS],(err,result)=>{
        if(err){
            // console.log("something is wrong");
             console.log(query.sql);
             return res.status(500).json({error: err});
          }
          else{
          console.log(result);
          res.status(201).json({msg: "Session saved"});
          //res.sendStatus(201);
          }

    })
})
// skeleton code for grabbing a student plan
router.get('/fetch', (req,res)=>{
    console.log(`Grabbing courses for user: ${req.body.uID}`);
    let fetchqry = `select * from StudentCourseTable where UserID = ${req.body.uID}`;
    conn.query(fetchqry,(err,result)=>{
        if(err){
            return res.status(500).json({ error: err });
        }
        else{
            
        }
    })
})
module.exports = router;