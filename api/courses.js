const conn = require("../mysqldb");
const router = require("express").Router();
const bodyParser = require("body-parser");
const conf = require("../configuration/config.json");
//const { RecyclerViewBackedScrollViewBase } = require("react-native");

router.use(bodyParser.json());

router.post('/courses',(req,res)=>{
    console.log("I made it this far");
    let courseList = [];
    for(let i=0;i<req.body.courseCode.length;i++){
    conn.query(`select * from Courses where CoursePrefix = "${req.body.courseCode[i]}";`), function (error,result) {
    if (error) {
        console.log(error);
    }
    else{
        /*test log be sure to remove */console.log("this is current course",req.body.course[i]);
        rows.forEach((rows) =>{
            let course = {
                CoursePrefix : rows.CoursePrefix,
                CourseName: rows.CourseName,
                CourseCode: rows.CourseCode,
                Semester: rows.Semester,
                CreditHours: rows.CreditHours
            }

        })
        courseList.push(course);
        /*test log be sure to remove*/console.log(courseList);

    }
   }

}
return (res.status(200).json({Courses: courseList}));

    

})
module.exports = router;