const Order = require('../models/order.model');
const Product = require('../models/product.model');
const { ObjectId } = require('mongodb');

class VendorService {
    async getVendorSalesSummary(vendorId) {
        try {
            const pipeline = [
                { $unwind: '$cart_item' },
                {
                    $lookup: {
                        from: 'parent_products',
                        localField: 'cart_item.product',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: '$product_details' },
                {
                    $match: {
                        'product_details.vendor': new ObjectId(vendorId),
                        'cart_item.order_status': { $in: ['Confirmed', 'Received'] }
                    }
                },
                {
                    $group: {
                        _id: '$cart_item.product',
                        product_name: { $first: '$product_details.name' },
                        total_sales_count: {
                            $sum: { $multiply: ['$cart_item.item_count', '$cart_item.quantity'] }
                        },
                        total_revenue: {
                            $sum: {
                                $multiply: [
                                    '$cart_item.price',
                                    '$cart_item.item_count',
                                    '$cart_item.quantity'
                                ]
                            }
                        },
                        total_cost: {
                            $sum: {
                                $multiply: [
                                    '$cart_item.cogs',
                                    '$cart_item.item_count',
                                    '$cart_item.quantity'
                                ]
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        product_id: '$_id',
                        product_name: 1,
                        total_sales_count: 1,
                        total_revenue: { $round: ['$total_revenue', 2] },
                        total_cost: { $round: ['$total_cost', 2] },
                        total_margin: {
                            $round: [{ $subtract: ['$total_revenue', '$total_cost'] }, 2]
                        }
                    }
                },
                { $sort: { total_revenue: -1 } }
            ];

            const salesSummary = await Order.aggregate(pipeline);
            console.log("salesSummary", salesSummary.length);
            return salesSummary;
        } catch (error) {
            console.error("Error fetching vendor sales summary:", error);
            throw error;
        }
    }

    async getMonthlyVendorSales(vendorId, startDate, endDate) {
        try {
            const end = endDate ? new Date(endDate) : new Date();
            const start = startDate ? new Date(startDate) : new Date(end.getFullYear(), end.getMonth() - 11, 1);

            const pipeline = [
                {
                    $match: {
                        payment_at: {
                            $gte: start,
                            $lte: end
                        }
                    }
                },
                { $unwind: '$cart_item' },
                {
                    $lookup: {
                        from: 'parent_products',
                        localField: 'cart_item.product',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: '$product_details' },
                {
                    $match: {
                        'product_details.vendor': new ObjectId(vendorId),
                        'cart_item.order_status': { $in: ['Confirmed', 'Received'] }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$payment_at' },
                            month: { $month: '$payment_at' }
                        },
                        total_sales_count: {
                            $sum: { $multiply: ['$cart_item.item_count', '$cart_item.quantity'] }
                        },
                        total_revenue: {
                            $sum: {
                                $multiply: [
                                    '$cart_item.price',
                                    '$cart_item.item_count',
                                    '$cart_item.quantity'
                                ]
                            }
                        },
                        total_cost: {
                            $sum: {
                                $multiply: [
                                    '$cart_item.cogs',
                                    '$cart_item.item_count',
                                    '$cart_item.quantity'
                                ]
                            }
                        },
                        order_count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: '$_id.year',
                        month: '$_id.month',
                        total_sales_count: 1,
                        total_revenue: { $round: ['$total_revenue', 2] },
                        total_cost: { $round: ['$total_cost', 2] },
                        profit: { $round: [{ $subtract: ['$total_revenue', '$total_cost'] }, 2] },
                        order_count: 1
                    }
                },
                {
                    $sort: {
                        year: -1,
                        month: -1
                    }
                }
            ];

            return await Order.aggregate(pipeline);
        } catch (error) {
            console.error("Error fetching monthly vendor sales:", error);
            throw error;
        }
    }
}

module.exports = new VendorService(); 