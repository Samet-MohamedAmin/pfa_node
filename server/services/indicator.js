const Indicator=require('../models/indicator')

module.exports = {
    async getAll () {
       return Indicator.getIndicators()
    },
    async incrementFormedMembersNumber(userType,isFemale){
        let indicators=await Indicator.getIndicators() 
        if (userType=="student")
        indicators.formedStudentsNumber++
        if (userType=="teacher")
        indicators.formedTeachersNumber++

        if(isFemale) indicators.femaleFormedMembers++

        await indicators.save()
      },
      async incrementCenterTrainingsNumber(type){
        let indicators=await Indicator.getIndicators() 
        if(type=="planified")
        indicators.numberOfTrainingsPlanifiedByTheCenter++
        if(type=="realized")
        indicators.numberOfTrainingsRealizedByTheCenter++

         return indicators.save()
      },
       updateOne (_id, _indicators) {
        console.log('indicators update')
        console.log(new Date())
        return Indicator.findByIdAndUpdate(_id,_indicators,{new:true})
      }
}