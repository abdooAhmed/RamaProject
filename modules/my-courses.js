const mongoose = require('mongoose');
const mycoursesSchema = mongoose.Schema({
    courseCode:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('mycourses',mycoursesSchema);



