const express = require('express');
const path = require('path');
const jsonfile = require('jsonfile')
const app = express();
const coursesDb = { courses: [], myCourses:[], subjects:[] };

const file = "miun-db.json";
jsonfile.readFile(file, function(err, obj) {
    if (err) {
        console.log(err);
    } else {
        //console.log(obj),
        coursesDb.courses =obj.courses;
        coursesDb.myCourses = obj.myCourses;
        coursesDb.subjects = obj.subjects;

    }

});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.Port || 3000;
app.listen(port, function() {
console.log(`Server is running on port ${port}`);
});

app.get('/api/courses', function (req, res) {
    for (let i = 0; i < coursesDb.courses.length; i++) {
        coursesDb.courses[i].subject= getSubjectName(coursesDb.courses[i].subjectCode) ;
        
      }
    res.status(200).json(coursesDb); // 200 OK
});


app.get('/api/subjects', function (req, res) {
    res.status(200).json(coursesDb); // 200 OK
});

app.get('/api/my/courses', function (req, res) {
    res.status(200).json(coursesDb); // 200 OK
});


app.post('/api/courses', function (req, res) {
    const courseCode = req.body.courseCode;
    const subjectCode = req.body.subjectCode;
    const level = req.body.level;
    const progression = req.body.progression;
    const name = req.body.name;
    const points = req.body.points;
    const institutionCode = req.body.institutionCode

 
    let course = null;
    //if (!courseCode)
//  console.log("course is null");   

if (courseCode && subjectCode && level && progression && name && 
    points && institutionCode ) {
        //console.log("course is generated");    
    
    course = generateCourse(courseCode, subjectCode, level, progression,
    name, points, institutionCode );
    
}

if (course) {
    // Add user to users in userDb
    coursesDb.courses.push(course);

    // Send the created user as response 
    res.status(201).json(course);  // 201 Created
}
else {
    
    res.status(400).json({ error: 'courseCode, subjectCode, level, progression, name, points and / or institutionCode are missing.' });  // 400 Bad Request
}
});



app.post('/api/my/courses', function (req, res) {
    const courseCode = req.body.courseCode;
    const status = req.body.status;

    let myCourse =null;

if (courseCode && status  ) { 

    const index = coursesDb.myCourses.findIndex((myCourse => myCourse.courseCode == courseCode));

    if (index == -1) {
        myCourse = generatemyCourse(courseCode, status);

    
        
    }
 else { 
     res.status(409).json({ error: `The course with the courseCode ${courseCode} has been added before` });
 }
}

if (myCourse) {
  

    // Add user to users in userDb
    coursesDb.myCourses.push(myCourse);

    // Send the created user as response 
    res.status(201).json(myCourse);  // 201 Created
}
else {
    
    res.status(400).json({ error: 'courseCode and / or status are missing.' });  // 400 Bad Request
}
});




app.post('/api/my/courses/:courseCode', function (req, res) {
    const courseCode = req.body.courseCode;
    const status = req.body.status;

    let myCourse = null;

if (courseCode && status  ) { 

    const index = coursesDb.myCourses.findIndex((myCourse => myCourse.courseCode == courseCode));

    if (index == -1) {
        myCourse = generatemyCourse(courseCode, status);

    
        
    }
 else { 
     res.status(409).json({ error: `The course with the courseCode ${courseCode} has been added before` });
 }
}

if (myCourse) {
  

    // Add user to users in userDb
    coursesDb.myCourses.push(myCourse);

    // Send the created user as response 
    res.status(201).json(myCourse);  // 201 Created
}
else {
    
    res.status(400).json({ error: 'courseCode and / or status are missing.' });  // 400 Bad Request
}
});




app.get('/api/my/courses/:courseCode', function (req, res) {
    const courseCode = req.params.courseCode;

    // Find index in the users array for the user with the given uuid (if any)
    const index = coursesDb.myCourses.findIndex((myCourse => myCourse.courseCode == courseCode));

    if (index != -1) {
        // Make a deep copy of the user to send back as response
        const foundedMyCourse = JSON.parse(JSON.stringify(coursesDb.myCourses[index]));

        

       
        res.status(200).json( foundedMyCourse );  // 200 OK
    }
    else {
        // A user with the given user uuid does not exist
        // Send an error message as response
        res.status(404).json({ error: `A course with courseCode ${courseCode} does not exists!` });  // 404 Not Found
    }
});


app.get('/api/courses/:courseCode', function (req, res) {
    const courseCode = req.params.courseCode;

    // Find index in the users array for the user with the given uuid (if any)
    const index = coursesDb.courses.findIndex((courses => courses.courseCode == courseCode));

    if (index != -1) {
        // Make a deep copy of the user to send back as response
        const foundedCourse = JSON.parse(JSON.stringify(coursesDb.courses[index]));

 

       
        res.status(200).json( foundedCourse );  // 200 OK
    }
    else {
        // A user with the given user uuid does not exist
        // Send an error message as response
        res.status(404).json({ error: `A course with courseCode ${courseCode} does not exists!` });  // 404 Not Found
    }
});


app.get('/api/subjects/:subjectCode', function (req, res) {
    const subjectCode = req.params.subjectCode;

    // Find index in the users array for the user with the given uuid (if any)
    const index = coursesDb.subjects.findIndex((subjects => subjects.subjectCode == subjectCode));

    if (index != -1) {
        // Make a deep copy of the user to send back as response
        const foundedsubject= JSON.parse(JSON.stringify(coursesDb.subjects[index]));

 

       
        res.status(200).json( foundedsubject );  // 200 OK
    }
    else {
        // A user with the given user uuid does not exist
        // Send an error message as response
        res.status(404).json({ error: `A subject with subjectCode ${subjectCode} does not exists!` });  // 404 Not Found
    }
});




app.post('/api/subjects', function (req, res) {
    const subjectCode = req.body.subjectCode;
    const subject = req.body.subject;
    const preamble = req.body.preamble;
    const bodyText = req.body.bodyText;
    const language = req.body.language;

 
    let subjectFull = null;

if (subjectCode && subject && preamble && bodyText && language ) {
        
    
        subjectFull = generateSubject(subjectCode, subject, preamble, bodyText,
        language );
    
}

if (subjectFull) {
  
    coursesDb.subjects.push(subjectFull);

  
    res.status(201).json(subjectFull);  // 201 Created
}
else {
    
    res.status(400).json({ error: 'subjectCode, subject, preamble, bodyText and / or language are missing.' });  // 400 Bad Request
}
});




app.put('/api/my/courses/:courseCode', function (req, res) {
    const courseCode = req.params.courseCode;
    const status = req.body.status;

    let myCourse;

    // Find index in the users array for the user with the given uuid (if any)
    const index = coursesDb.myCourses.findIndex((myCourse => myCourse.courseCode == courseCode));

    if (index != -1) {
        // Make a deep copy of the user to send back as response
        const editMyCourse = JSON.parse(JSON.stringify(coursesDb.myCourses[index]));

        // Remove the user from the array
        coursesDb.myCourses.splice(index, 1);

        myCourse = generatemyCourse(courseCode, status);
        coursesDb.myCourses.push(myCourse);

        // Send the deleted user as response 
        res.status(200).json( myCourse );  // 200 OK
    }
    else {
        // A user with the given user uuid does not exist
        // Send an error message as response
        res.status(404).json({ error: `A mycourse with courseCode ${courseCode} does not exists!` });  // 404 Not Found
    }
});


app.delete('/api/courses/:courseCode', function (req, res) {
    const courseCode = req.params.courseCode;

    // Find index in the users array for the user with the given uuid (if any)
    const index = coursesDb.courses.findIndex((course => course.courseCode == courseCode));

    if (index != -1) {
        // Make a deep copy of the user to send back as response
        const deletedCourse = JSON.parse(JSON.stringify(coursesDb.courses[index]));

        // Remove the user from the array
        coursesDb.courses.splice(index, 1);

        // Send the deleted user as response 
        res.status(200).json( deletedCourse );  // 200 OK
    }
    else {
        // A user with the given user uuid does not exist
        // Send an error message as response
        res.status(404).json({ error: `A course with courseCode ${courseCode} does not exists!` });  // 404 Not Found
    }
});




app.delete('/api/my/courses/:courseCode', function (req, res) {
    const courseCode = req.params.courseCode;

    // Find index in the users array for the user with the given uuid (if any)
    const index = coursesDb.myCourses.findIndex((myCourse => myCourse.courseCode == courseCode));

    if (index != -1) {
        // Make a deep copy of the user to send back as response
        const deletedmyCourse = JSON.parse(JSON.stringify(coursesDb.myCourses[index]));

        // Remove the user from the array
        coursesDb.myCourses.splice(index, 1);

        // Send the deleted user as response 
        res.status(200).json( deletedmyCourse );  // 200 OK
    }
    else {
        // A user with the given user uuid does not exist
        // Send an error message as response
        res.status(404).json({ error: `A course with mycourseCode ${courseCode} does not exists!` });  // 404 Not Found
    }
});


function getSubjectName(subjectCode) {
    if (!coursesDb.subjects || !subjectCode) {        
        return '';
        
    }

    for (let i =0; i < coursesDb.subjects.length; i++) {
        if (coursesDb.subjects[i].subjectCode == subjectCode) {
            //console.log(" found subject "+ coursesDb.subjects[i].subject);
            return coursesDb.subjects[i].subject;
        }
    }
    return '';
}




function generateCourse(courseCode, subjectCode, level, progression,
    name, points, institutionCode) {
    const newCourseCode = courseCode ;
    const newSubjectCode = subjectCode;
    const newLevel = level;
    const newProgression = progression;
    const newName = name;
    const newPoints = points;
    const newInstitutionCode = institutionCode;
    const newSubject = getSubjectName(subjectCode);
    
    
    const course = {
        'courseCode': newCourseCode,
        'subjectCode': newSubjectCode,
        'level': newLevel,
        'progression': newProgression,
        'name' : newName,
        'points' : newPoints,
        'institutionCode' : newInstitutionCode,
        'subject' : newSubject
        
    };

    return course;
}



function generatemyCourse(courseCode, status) {
    const newCourseCode = courseCode ;
    const newStatus = status;

    
    
    const myCourse = {
        'courseCode': newCourseCode,
        'status': newStatus,
    };

    return myCourse;
}



function generateSubject(subjectCode, subject, preamble, bodyText,
    language) {
    const newSubjectCode = subjectCode ;
    const newSubject = subject;
    const newPreamble = preamble;
    const newBodyText = bodyText;
    const newLanguage = language;
  
    
    
    const subjectFull = {
        'subjectCode': newSubjectCode,
        'subject': newSubject,
        'preamble': newPreamble,
        'bodyText': newBodyText,
        'language' : newLanguage,
        
    };

    return subjectFull;
}