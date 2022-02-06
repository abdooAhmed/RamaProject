const express = require('express');
const router = express.Router();

const my_courses = require('../modules/my-courses');
const Subjects = require('../modules/subjects');

const Courses = require('../modules/courses');
const courses = require('../modules/courses');



router.post('/',async (req,res)=>{
    var SavedCourses = new Array();
    for(var keys in req.body){
        const courses = new Courses({
        courseCode: req.body[keys].courseCode,
        subjectCode: req.body[keys].subjectCode ,
        level: req.body[keys].level ,
        name: req.body[keys].name ,
        points: req.body[keys].points ,
        institutionCode: req.body[keys].institutionCode ,
        subject: req.body[keys].subject,
        progression:req.body[keys].progression
    });
    console.log(courses);
    try{
        SavedCourses.push(await courses.save());
        console.log("done");
    }
    catch(err){
        console.log("error");
        res.json({message : err})
    }
    }
    res.json(SavedCourses);
    
});

router.get('/',async (req,res)=>{
    console.log("GET Request");
    try{
        const courses = await Courses.find();
        console.log(courses);
        res.json(courses);

    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/:courseCode',async (req,res)=>{
    try{
        const course = await Courses.findOne({courseCode:req.params.courseCode});
        res.json(course);

    }
    catch(err){
        res.json({message:err});
    }
});

router.delete('/:courseCode',async (req,res)=>{
    try{
        const course = await Courses.remove({ courseCode:req.params.courseCode });
        res.json(courses);

    }
    catch(err){
        res.json({message:err});
    }
});


router.put('/:courseCode',async (req,res)=>{
    try{
        const courseData = await courses.findOne({courseCode:req.params.courseCode});
        if(req.body.courseCode != ""){
        courseData.courseCode = req.body.courseCode;
    }
    if(req.body.subjectCode != ""){
        courseData.subjectCode = req.body.subjectCode;
    }
    if(req.body.level != ""){
        courseData.level = req.body.level;
    }
    if(req.body.progression != ""){
        courseData.progression = req.body.progression;
    }
    if(req.body.name != ""){
        courseData.name = req.body.name;
    }
    if(req.body.points != ""){
        courseData.points = req.body.points;
    }
    if(req.body.institutionCode != ""){
        courseData.institutionCode = req.body.institutionCode;
    }
    if(req.body.subject != ""){
        courseData.subject = req.body.subject;
    }

        const course = await Courses.updateOne({ courseCode:req.params.courseCode },{$set:{subjectCode:courseData.subjectCode, level:courseData.level, 
            progression:courseData.progression, name:courseData.name, points:courseData.points, institutionCode:courseData.institutionCode,
        subject:courseData.subject }});
        res.json(courseData);

    }
    catch(err){
        res.json({message:err});
    }
});

module.exports = router;