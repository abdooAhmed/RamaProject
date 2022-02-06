const mongoose = require('mongoose');
const subjectsSchema = mongoose.Schema({
    subjectCode:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    preamble:{
        type:String,
        required:false
    },
    bodyText:{
        type:String,
        required:false
    },
    language:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('subjects',subjectsSchema);



