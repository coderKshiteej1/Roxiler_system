const express = require('express')
const {DB_init,gettransaction, getTransactionStatistics,getStatisticsForPieChart,getStatisticsForBarChart,getCombineStatistics} = require('../controller/transactionController')
  

const Router = express.Router()

Router.route("/db_init").get(DB_init) 
Router.route("/transactions/get").get(gettransaction) 
Router.route("/transactions/statistics/sells/get").get(getTransactionStatistics) 
Router.route("/transactions/statistics/pieChart/get").get(getStatisticsForPieChart) 
Router.route("/transactions/statistics/barChart/get").get(getStatisticsForBarChart) 
Router.route("/transactions/statistics/combine/get").get(getCombineStatistics) 
  
 

module.exports = Router