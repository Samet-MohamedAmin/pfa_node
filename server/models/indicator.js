const mongoose = require('mongoose')
mongoose.Promise=Promise

const Schema =mongoose.Schema

const IndicatorSchema =Schema({ 
    //managed and updated by the admin 

    certifiedStudentsNumber:{
        type:Number,
        default:0
    },
    numberOfTotalCenterActions:{
        type:Number,
        default:0
    },
    certifiedTeachersNumber:{
        type:Number,
        default:0
    },
    //managed automatically by the platform

    formedStudentsNumber:{
        type:Number,
        default:0
    },
    formedTeachersNumber:{
        type:Number,
        default:0
    },
    femaleFormedMembers:{
        type:Number,
        default:0
    },
    numberOfTrainingsPlanifiedByTheCenter:{
        type:Number,
        default:0
    },
    numberOfTrainingsPlanifiedByTheCenter:{
        type:Number,
        default:0
    },
    numberOfTrainingsRealizedByTheCenter:{
        type:Number,
        default:0
    },
    additionnelIndicators:{
    type:Schema.Types.Mixed,
    default:{}
}

},{strict:false});

IndicatorSchema.statics.initilizeIndicatorsList=async function(){
let indic=await Indicator.getIndicators()
if(indic){
    return;
}
let indicators =new Indicator()
await indicators.save()
}

IndicatorSchema.statics.getIndicators=function(){
    return Indicator.findOne()
}


const Indicator = mongoose.model('Indicator', IndicatorSchema)

module.exports = Indicator