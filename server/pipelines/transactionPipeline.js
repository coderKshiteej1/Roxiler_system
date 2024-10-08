const productModel = require("../model/transactionModel");

const getMonthNumber = (monthName) => {
    const date = new Date(Date.parse((monthName || 'march').toLowerCase() + " 1, 2021"));
    return date.getMonth() + 1; // Months are 0-based
};

exports.TransactionStatistics_pipeline = async(month)=>{
 
    return  await productModel.aggregate([
        {
            $project: {
                price: 1,
                sold: 1,
                dateOfSale: 1,
                month: { $month: "$dateOfSale" }
            }
        },
        {
            $match: {
                month: getMonthNumber(month),
            }
        },
        {
            $facet: {
                soldItems: [
                    {
                        $match: { sold: true }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSum: { $sum: "$price" }
                        } 
                    }
                ],
                soldItemsCount: [
                    {
                        $match: { sold: true }
                    },
                    {
                        $count: "count"
                    }
                ],
                unsoldItemsCount: [
                    {
                        $match: { sold: false }
                    },
                    {
                        $count: "count"
                    }
                ]
            }
        }
    ])

}

exports.getStatisticsForPieChart_pipeline = async(month)=>{
 
 // Get the statstics of trasacions
 return  await productModel.aggregate([
    // Project necessary fields and calculate month from dateOfSale
    {
        $project: {
            category: 1,
            month: { $month: "$dateOfSale" }
        }
    },
    // Match documents for the specified month
    {
        $match: {
            month: getMonthNumber(month),
        }
    },
    // Group by category and count the number of items
    {
        $group: {
            _id: "$category",
            value: { $sum: 1 }
        }
    },
     
]);
}

exports.getStatisticsForBarChart_pipeline = async(month)=>{
 
     // Get the statstics of trasacions
     return  await productModel.aggregate([
        // Project necessary fields and calculate month from dateOfSale
        {
            $project: {
                price: 1,
                month: { $month: "$dateOfSale" }
            }
        },
        // Match documents for the specified month
        {
            $match: {
                month: getMonthNumber(month) // Replace month with the desired month parameter
            }
        },
        // Bucket by price ranges
        {
            $bucket: {
                groupBy: "$price",
                boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                default: "Other",
                output: {
                    count: { $sum: 1 }
                }
            }
        },
         
    ]);
}