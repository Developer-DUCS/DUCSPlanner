const conn = require("../mysqldb");
const router = require("express").Router();
const bodyParser = require("body-parser");
const conf = require("../configuration/config.json");
//const { RecyclerViewBackedScrollViewBase } = require("react-native");

router.use(bodyParser.json());

//Test router
router.post('/courses', (req, res) => {

    function getPrereq(course) {
        let prereqList = [];
        if(course.HasPrereq == 'Yes') {
            let qry2 = `SELECT distinct CoursePrefix, CourseCode FROM Courses, Prerequisites 
                        WHERE UniqueCourseID IN (SELECT Prereq_ID FROM Courses, Prerequisites
                                                WHERE Course_ID IN (SELECT UniqueCourseID FROM Courses
                                                                    WHERE CoursePrefix = "${course.CoursePrefix}" AND CourseCode = ${course.CourseCode}));`;
            return new Promise((resolve, reject) => {
                conn.query(qry2, (err, rows2) => {
                    if (err) {
                        reject(err);
                    }
    
                    else {
                        rows2.forEach((row2) => {
                            prereqList.push([row2.CoursePrefix, row2.CourseCode])
                        });
                        resolve(prereqList);
                    }
                });
            });
        }
        else {
            return Promise.resolve(prereqList); 
        }
    }
    
    function getCourses(courseCode){
        let prereqList = [];
        let qry = `select distinct CoursePrefix,CourseName,CourseCode,Semester,CreditHours,HasPrereq,Required from courses join Credentials_has_Courses on Credentials_has_Courses.Courses_UniqueCourseID=Courses.UniqueCourseID WHERE Credentials_CredentialID IN (${courseCode});`;
        return new Promise((resolve, reject) => {
            conn.query(qry, (err, rows) => {
                if (err) {
                    reject(err);
                }
    
                else {
                    let courseList = [];
                    rows.forEach((rows) => {
                        let course = {
                            CoursePrefix: rows.CoursePrefix,
                            CourseName: rows.CourseName,
                            CourseCode: rows.CourseCode,
                            Semester: rows.Semester,
                            CreditHours: rows.CreditHours,
                            HasPrereq: rows.HasPrereq,
                            Prereqs: prereqList,
                            Required: rows.Required
                        }
                        courseList.push(course);
                    })
                    resolve(courseList);
                }

             
            });
        });
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    }

    async function init() {
        let courseCode = req.body.courseCode;
        console.log(courseCode);
        let courses = await getCourses(courseCode);
        await asyncForEach(courses, async (course) => {
            let prereqList = await getPrereq(course);
            course.Prereqs = prereqList;
        })
        console.log(courses);
        return (res.status(200).json({ Courses: courses }));
    }

    init();
});



//possibly new route playing with different options
router.post('/providingCredentials', (req,res) => {
    console.log('Credentials to be provided to drop down');
    let query = `Select * from Credentials;`;
    conn.query(query,(err, rows) =>{
        if (err){
            
            return res.status(500).json({ error: err});
        }
        else {
            console.log("I got to here yay!");
            let CredList = [];
            rows.forEach((rows) => {
                let Cred = {
                    CredentialID : rows.CredentialID,
                    CredentialName : rows.CredentialName,
                    Type : rows.Type,
                    CredType : rows.CredType
                }
                CredList.push(Cred);

            })
            console.log(CredList);
            return (res.status(200).json({ Credentials : CredList }));
        }
    })

})


//skeleton code for creating a plan
 router.post('/create', (req,res) => {
    let studCode = req.body.ID;
    console.log(studCode);
    let studPlan = req.body.Plan;
    console.log(studPlan);
     let saveQry = `REPLACE INTO StudentPlans (PlanItUsers_usersId, StudentPlan) VALUES (${studCode}, '[${studPlan}]');`;//wrap studplan ins '[]';
     conn.query(saveQry, (err) => {
        console.log("I'm in the plan saving function");
        console.log(saveQry);
        if(err){
            console.log(res.statusCode);
            //console.log(saveQry.sql);
            console.log("savePlan function has the error");
            //reject(('error didn"t save plane'),500);
            //return res.status(500).json({error:err});
        }
        else{
            console.log("plan saved successfully");
            return (res.status(200).json({message: "Plan created successfully"}));
        }
    });
   
})
// skeleton code for grabbing a student plan
router.post('/fetch', (req,res)=>{
    console.log(`Grabbing courses for user: ${req.body.uID}`);
    let code = req.body.uID;
    console.log(code);
    let fetchqry = `select * from StudentPlans where PlanItUsers_usersId = ${code};`;
    conn.query(fetchqry,(err,rows)=>{
        if(err){
            console.log(fetchqry.sql);
            return res.status(500).json({ error: err });
        }
        else if(rows.length == 0){
            return (res.status(404).json({ message: 'Plan not found' }));
        }
        else{
            for (let l = 0; l < rows.length; l++){
                console.log(rows[l].StudentPlan);
                return (res.status(200).json({studentPlan: rows[l].StudentPlan}));

            }
            
        }
    });
});
module.exports = router;