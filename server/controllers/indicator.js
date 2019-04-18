const Indicator=require('../models/indicator')
const indicatorService=require('../services/indicator')
module.exports = {
    async getAll (req, res) {
      const indicators = await Indicator.getIndicators()
      res.json(indicators)
    },
       async updateOne (req, res) {
        const indicators = await indicatorService.updateOne(req.params._id, req.body)
        res.json(indicators)
      }
}