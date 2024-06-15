import { Pagination, Transaction } from "@/app/interface";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";

export default class Transactions {
    static collection() {
        return getCollection('Transactions')
    }

    static async findAll(page: number, userId: string) {
        const userIdAsObjectId = new ObjectId(userId)
        const dataPage = 5;
        const skipData = dataPage * page;
    
        const aggregateTotalData = [
            {
                $match: {
                    $or: [
                        { sellerId: userIdAsObjectId },
                        { buyerId: userIdAsObjectId }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $count: {}
                    }
                }
            }
        ];
    
        const aggregate = [
            {
                $match: {
                    $or: [
                        { sellerId: userIdAsObjectId },
                        { buyerId: userIdAsObjectId }
                    ]
                }
            },
            {
                $skip: skipData
            },
            {
                $limit: dataPage
            }
        ];
    
        const totalData = await this.collection().aggregate(aggregateTotalData).toArray();
        const transaction = (await this.collection().aggregate(aggregate).toArray()) as Transaction[];
    
        let currentPage = page + 1;
        let totalPage = Math.ceil(totalData[0].count / dataPage);
        const result: Pagination = {
            data: transaction,
            currentPage: currentPage,
            hashMore: currentPage < totalPage,
            currentData: transaction.length,
            totalData: totalData[0].count,
            totalPage: totalPage,
        };
        return result;
    }

    static async getTransactionBySellerId(sellerId: string) {
        const sellerIdAsObjectId = new ObjectId(sellerId);
        const aggregate = [
            {
                $match: {
                    sellerId: sellerIdAsObjectId
                },
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
        ];
    
        const transactions = await this.collection().aggregate(aggregate).toArray();
        return transactions;
    }

    static async getTransactionByBuyerId(buyerId: string) {
        const buyerIdAsObjectId = new ObjectId(buyerId);
        const aggregate = [
            {
                $match: {
                    buyerId: buyerIdAsObjectId
                },
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
        ];
    
        const transactions = await this.collection().aggregate(aggregate).toArray();
        return transactions;
    }
}