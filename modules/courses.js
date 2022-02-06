const mongoose = require('mongoose');
const coursesSchema = mongoose.Schema({
    courseCode:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    progression:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    points:{
        type:Number,
        required:true
    },
    institutionCode:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('courses',coursesSchema);


