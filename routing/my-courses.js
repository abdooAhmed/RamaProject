const express = require('express');
const router = express.Router();


const Subjects = require('../modules/subjects');
const Courses = require('../modules/courses');
const courses = require('../modules/courses');

const my_Courses = require('../modules/my-courses');
const my_courses = require('../modules/my-courses');
const myCourses = require('../modules/my-courses');



router.post('/',async (req,res)=>{

    var SavedCourses = new Array();
    for(var keys in req.body){
        const my_courses = new my_Courses({
        courseCode: req.body[keys].courseCode,
        status: req.body[keys].status,
        name: req.body[keys].name 
    });
    console.log(my_courses);
    try{
        SavedCourses.push(await my_courses.save());
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
        const my_courses = await my_Courses.find();
        console.log(my_courses);
        res.json(my_courses);

    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/:courseCode',async (req,res)=>{
    try{
        const my_course = await my_Courses.findOne({courseCode:req.params.courseCode});
        res.json(my_course);

    }
    catch(err){
        res.json({message:err});
    }
});

router.delete('/:courseCode',async (req,res)=>{
    try{
        const course = await my_Courses.remove({ courseCode:req.params.courseCode });
        res.json(my_courses);

    }
    catch(err){
        res.json({message:err});
    }
});

router.put('/:courseCode',async (req,res)=>{
    try{
        const myCourseData = await my_courses.findOne({courseCode:req.params.courseCode});
        if(req.body.courseCode != ""){
        myCourseData.courseCode = req.body.courseCode;
    }
    if(req.body.status != ""){
        myCourseData.status = req.body.status;
    }
    if(req.body.name != ""){
        myCourseData.name = req.body.name;
    }

        const mycourse = await my_Courses.updateOne({ courseCode:req.params.courseCode },{$set:{subjectCode:myCourseData.subjectCode, status:myCourseData.status, 
        name:myCourseData.name}});
        res.json(myCourseData);

    }
    catch(err){
        res.json({message:err});
    }
});

module.exports = router;