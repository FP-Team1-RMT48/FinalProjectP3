import { NewProduct, Pagination, Product } from "@/app/interface";
import { getCollection } from "../config";
import { z } from "zod";
import { ObjectId } from "mongodb";

// type NewProduct = Omit<Product, "_id">
type zodProduct = z.infer<typeof ProductSchema>

const ProductSchema = z.object({
    _id: z.string().min(1),
    sellerId: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    images: z.string().min(1),
    description: z.string().min(1),
    excerpt: z.string().optional(),
    type: z.string().min(1),
    status: z.string().default("AVAILABLE"),
    price: z.number().min(1),
    eventId: z.string().optional()
});

const NewProductSchema = z.object({
    sellerId: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    images: z.string().min(1),
    description: z.string().min(1),
    excerpt: z.string().optional(),
    type: z.string().min(1),
    status: z.string().default("AVAILABLE"),
    price: z.number().min(1),
    eventId: z.string().optional()
});

export default class Products {
    static collection() {
        return getCollection('Products')
    }

    static async findAll(page: number) {
        const dataPage = 5;
        const skipData = dataPage * page;

        const aggregateTotalData = [
            {
                $group: {
                    _id: null,
                    count: {
                        $count: {},
                    },
                },
            },
        ];

        const aggregate = [
            {
                $skip: skipData,
            },
            {
                $limit: dataPage,
            },
        ];

        const totalData = await this.collection().aggregate(aggregateTotalData).toArray();
        const products = (await this.collection().aggregate(aggregate).toArray()) as Product[];
        
        let currentPage = page + 1;
        let totalPage = Math.ceil(totalData[0].count / dataPage)
        const result: Pagination = {
            data: products,
            currentPage: currentPage,
            hashMore: currentPage < totalPage,
            currentData: products.length,
            totalData: totalData[0].count,
            totalPage: totalPage,
        };
        return result;
    }

    static async findBySlug(slug: string) {
        const product = await this.collection().findOne({ slug });
        return product;
    }

    static async addProduct(newProduct: NewProduct) {
        console.log(newProduct)
        NewProductSchema.parse(newProduct)
        await this.collection().insertOne(newProduct);

        return { message: "Success add new Product" }
    }

    static async getProductByName(searchKey: string) {
        const products = (await this.collection().find({ name: { $regex: searchKey, $option: "i" } }).toArray()) as Product[];

        return products;
    }

    static async getProductPreview() {
        const aggregate = [
            {
                $limit: 5,
            },
        ];
        const products = (await this.collection().aggregate(aggregate).toArray()) as Product[];
        return products;
    }
}