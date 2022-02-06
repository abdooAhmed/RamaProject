const express = require('express');
const router = express.Router();
const courses = require('../modules/courses');
const my_courses = require('../modules/my-courses');


const Subjects = require('../modules/subjects');

router.post('/',async (req,res)=>{
    var Savedsubjects = new Array();
    console.log(req.body[0].subjectCode);
    console.log(req.body[0].subject);
    console.log(req.body[0].preamble);
    console.log(req.body[0].bodyText);
    console.log(req.body[0].language);
   for(var keys in req.body){
       const subjects = new Subjects({
        subjectCode: req.body[keys].subjectCode,
        subject: req.body[keys].subject ,
        preamble: req.body[keys].preamble ,
        bodyText: req.body[keys].bodyText ,
        language: req.body[keys].language ,
    });
    try{
         Savedsubjects.push(await subjects.save());
        console.log("done");
    }
    catch(err){
        console.log("error");
        res.json({message : err})
    }
   }
   res.json(Savedsubjects);

    
});

router.get('/',async (req,res)=>{
    console.log("GET Request");
    try{
        const subjects = await Subjects.find();
        console.log(subjects);
        res.json(subjects);

    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/:subjectCode',async (req,res)=>{
    try{
        const subject = await Subjects.findOne({subjectCode:req.params.subjectCode});
        res.json(subject);

    }
    catch(err){
        res.json({message:err});
    }
});

router.delete('/:subjectCode',async (req,res)=>{
    try{
        const subject = await Subjects.remove({ subjectCode:req.params.subjectCode });
        res.json(Subjects);

    }
    catch(err){
        res.json({message:err});
    }
});

router.put('/:subjectCode',async (req,res)=>{
    try{
        const subjectData = await Subjects.findOne({subjectCode:req.params.subjectCode});
        if(req.body.subjectCode != ""){
        subjectData.subjectCode = req.body.subjectCode;
    }
    if(req.body.subject != ""){
        subjectData.subject = req.body.subject;
    }
    if(req.body.preamble != ""){
        subjectData.preamble = req.body.preamble;
    }
    if(req.body.bodyText != ""){
        subjectData.bodyText = req.body.bodyText;
    }
    if(req.body.language != ""){
        subjectData.language = req.body.language;
    }

        const subject = await Subjects.updateOne({ subjectCode:req.params.subjectCode },{$set:{subjectCode:subjectData.subjectCode, subject:subjectData.subject, 
        preamble:subjectData.preamble, bodyText:subjectData.bodyText, language:subjectData.language }});
        res.json(subjectData);

    }
    catch(err){
        res.json({message:err});
    }
});


module.exports = router;