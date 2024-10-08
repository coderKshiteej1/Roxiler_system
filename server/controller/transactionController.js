const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const connectTODatabase = require('../config/dataBase')

const productModel = require("../model/transactionModel");
const ErrorHandler = require("../utils/errorHandler");
const { default: axios } = require("axios");
const { TransactionStatistics_pipeline, getStatisticsForPieChart_pipeline, getStatisticsForBarChart_pipeline } = require("../pipelines/transactionPipeline");


const getMonthNumber = (monthName) => {
    const date = new Date(Date.parse((monthName || 'march').toLowerCase() + " 1, 2021"));
    return date.getMonth() + 1; // Months are 0-based
};

// intitize the database and fill the data from 3rd party api to db
const DB_init = catchAsyncErorr(async (req, res, next) => {
    if (await connectTODatabase()) {
        const data = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        await productModel.insertMany(data.data);
        res.status(201).json({
            status: "Data inserted successfuly"
        });
    }
});

const gettransaction = catchAsyncErorr(async (req, res, next) => {

    const search = (req.query.search || '').toLowerCase();
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 10;
    const month = (req.query.month || 'march').toLowerCase();


    // Get total count and paginated results
    const transactions = await productModel.aggregate([
        {
            $project: {
                title: 1,
                price: 1,
                description: 1,
                category: 1,
                image: 1,
                sold: 1,
                dateOfSale: 1,
                month: { $month: "$dateOfSale" }
            }
        },
        {
            $match: {
                month: getMonthNumber(month),
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { price: { $regex: search, $options: 'i' } }
                ]
            }
        },
        {
            $skip: (page - 1) * perPage
        },
        {
            $limit: perPage
        }
    ])

    const response = {
        currentPage: page,
        recordsCount: transactions.length,
        records: transactions
    };

    res.status(200).json(response);

});

const getTransactionStatistics = catchAsyncErorr(async (req, res, next) => {

    const response = await TransactionStatistics_pipeline(req.query.month)

    const updatedData = {
        "soldItems": response[0].soldItems[0].totalSum,
        "soldItemsCount": response[0].soldItemsCount[0].count,
        "unsoldItemsCount": response[0].unsoldItemsCount[0].count
    }
    res.status(200).json(updatedData);

});

const getStatisticsForPieChart = catchAsyncErorr(async (req, res, next) => {

    const response = await getStatisticsForPieChart_pipeline(req.query.month)

    const updatedData = response.map((item, index) => ({
        id: index,
        label: item._id,
        value: item.value
    }));

    res.status(200).json(updatedData);

});

const getStatisticsForBarChart = catchAsyncErorr(async (req, res, next) => {

    const response = await getStatisticsForBarChart_pipeline(req.query.month);
    const Yaxis = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    let temp = [];
    const set = {};
    for (let i = 0; i < response.length; i++) {
        set[response[i]._id] = response[i].count;
    }
    for (let i = 0; i < Yaxis.length; i++) {
        if (set[Yaxis[i]]) {
            temp.push(set[Yaxis[i]])
        } else {
            temp.push(0)
        }
    }

    res.status(200).json(temp);

});

const getCombineStatistics = catchAsyncErorr(async (req, res, next) => {

    const month = (req.query.month || 'march').toLowerCase();

    const [transactionStats, pieChartStats, barChartStats] = await Promise.all([
        TransactionStatistics_pipeline(month),
        getStatisticsForPieChart_pipeline(month),
        getStatisticsForBarChart_pipeline(month)
    ]);

    // Combine results into a single response object
    const combinedResults = {
        transactions: transactionStats[0],  // transactions[0] because $facet returns an array
        pieChartStats,
        barChartStats
    };

    // Send the combined response
    res.status(200).json(combinedResults);

});


module.exports = { DB_init, gettransaction, getTransactionStatistics, getStatisticsForPieChart, getStatisticsForBarChart, getCombineStatistics }
