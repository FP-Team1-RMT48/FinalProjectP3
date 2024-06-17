import { NewTransaction, Pagination, Transaction, TransactionInput } from "@/app/interface";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";
import { z } from "zod";

const NewTransactionSchema = z.object({
    productId: z
        .string({ message: "Product ID is required" })
        .min(1, { message: "Product ID is required" }),
    buyerId: z
        .string({ message: "Buyer ID is required" })
        .min(1, { message: "Buyer ID is required" }),
    sellerId: z
        .string({ message: "Seller ID is required" })
        .min(1, { message: "Seller ID is required" }),
    status: z
        .string()
        .default("DRAFT"),
});

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
                    as: "productDetail",
                },
            },
            {
                $unwind: {
                    path: "$productDetail",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const transactions = await this.collection().aggregate(aggregate).toArray();
        return transactions;
    }

    static async addTransactionByBuyerId(buyerId: string) {
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

    static async addCartTransactionByBuyerId(newTransaction: TransactionInput) {
        const validatedTransaction = NewTransactionSchema.parse(newTransaction);
        const alreadyOnCart = await this.collection().findOne({
            productId: new ObjectId(validatedTransaction.productId),
            sellerId: new ObjectId(validatedTransaction.sellerId),
            buyerId: new ObjectId(validatedTransaction.buyerId)
        })
        if (alreadyOnCart) throw new Error("You Have Already added this item to your Cart")
        const result = await this.collection().insertOne({
            ...validatedTransaction,
            productId: new ObjectId(validatedTransaction.productId),
            sellerId: new ObjectId(validatedTransaction.sellerId),
            buyerId: new ObjectId(validatedTransaction.buyerId),
            createdAt: new Date()
        });
        return result.insertedId;
    }

    static async deleteTransaction(transactionId: string, userId: string) {
        const transactionObjectId = new ObjectId(transactionId)
        const userObjectId = new ObjectId(userId)
        console.log(
            `Deleting transaction with transactionId: ${transactionObjectId} and userId: ${userObjectId}`
        );
        const existingTransaction = await this.collection().findOne({ _id: transactionObjectId })
        if (!existingTransaction) {
            throw new Error("Transaction not found") 
        }
        if (existingTransaction.buyerId.toString() !== userId) {
            throw new Error("User not authorized to delete this product");
        }
        const deleteResult = await this.collection().deleteOne({
            _id: new ObjectId(transactionObjectId),
            buyerId: new ObjectId(userObjectId)
        })
        console.log(`Delete result: ${JSON.stringify(deleteResult)}`);
        return { message: "transaction deleted successfully" };
    }
}