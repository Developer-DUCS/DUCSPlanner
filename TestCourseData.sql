use PlanItTest;
insert into UserAccountsTest (Email , Password, role , Department, Year_Started , FName , Lname) values ("testStud@school.edu","Letmein!1","student","tempDepartment","2021","MrStudent","McStudent");
select * from UserAccountsTest;
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("CSGD","Discrete_Mathematics",241,"fall",3);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("CSSE","Intro_To_Computer_Science",251,"fall",4);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("MATH","Calculus_I",231,"fall",4);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("CSCI","Data_Structures",261,"fall",4);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("CSSE","Intro_To_Computer_Science",251,"fall",4);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("CRIM","Intro_To_Criminology",102,"fall",3);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("ENGL","British Literature I",201,"fall",3);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("INTD","Interactive_Design_And_Aesthetics",314,"fall",3);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("INTI","Comparative_Mythology",212,"fall",3);
insert into Courses (CoursePrefix,CourseName,CourseCode,Semester,CreditHours) values ("ANCA","Ancient_Civilizations",110,"fall",3);
select * from Courses;