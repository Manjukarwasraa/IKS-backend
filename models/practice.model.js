const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    Category:{
        type:String,
        enum:[
            "Water Conservation",
            "Traditional Architecture",
            "Food Preservation",
            "Climate Adaptation",
            "Agriculture",
            "Ayurveda"
        ],
        required : true
    },
    Title:{
        type:String,
        required: true
    },
    Role:{
        type:String,
        required: true
    },
    Community:{
        type:String,
        required: true
    },
    Benifits:{
        type:String,
        required: true
    },
   
    Verified:{
        type:Boolean,
        required: true,
        default:false
    },
    Region:{
        type:String,
        required: true
    },
    Source:{
        type:String,
        enum: ["oral", "written", "field-study", "community-verified"],
        required: true
    },
     Description:{
        type:String,
        required: true
    },
    CreatedBy:{
        type:Date,
        default: Date.now
    },
},{timestamps:true},)

module.exports = mongoose.model('Practices', practiceSchema);
   