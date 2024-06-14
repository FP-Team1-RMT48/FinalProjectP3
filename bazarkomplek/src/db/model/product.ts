import { EditedProduct, NewProduct, Pagination, Product } from "@/app/interface";
import { getCollection } from "../config";
import { z } from "zod";
import { ObjectId } from "mongodb";

const NewProductSchema = z.object({
    sellerId: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    images: z.string().min(1),
    description: z.string().min(1),
    excerpt: z.string().optional(),
    type: z.string().min(1),
    category: z.string().min(1),
    status: z.string().default("VERIFYING"),
    price: z.number().min(1),
    eventId: z.string().optional()
});

export function createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

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
            {
                $lookup:
                    {
                        from: "Events",
                        localField: "eventId",
                        foreignField: "_id",
                        as: "eventDetails",
                    },
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
        const addedProduct = {
            ...newProduct,
            slug: createSlug(newProduct.name),
        };

        const parseResult = NewProductSchema.safeParse(addedProduct)
        if (!parseResult.success) {
            throw parseResult.error
        }
        
        const isProductSlugExist = await this.collection().findOne({
            slug: addedProduct.slug,
        });
        if (isProductSlugExist) {
            throw new Error("product name already exist");
        }

        await this.collection().insertOne(addedProduct);

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

    static async editProduct(slug: string, updatedProductBody: EditedProduct, userId: string) {
        const existingProduct = await this.collection().findOne({ slug });
        // console.log(existingProduct)
        if (!existingProduct) {
            throw new Error("Product not found");
        }
        if (existingProduct.sellerId !== userId) {
            throw new Error("User not authorized to edit this product");
        }
        const editedProduct = {
            ...existingProduct,
            name: updatedProductBody.name,
            images: updatedProductBody.images,
            description: updatedProductBody.description,
            excerpt: updatedProductBody.excerpt,
            type: updatedProductBody.type,
            category: updatedProductBody.category,
            status: updatedProductBody.status,
            price: updatedProductBody.price,
            slug: createSlug(updatedProductBody.name),
        };
        console.log(editedProduct)
        NewProductSchema.partial().parse({ editedProduct });
        console.log(updatedProductBody, "<<<<<<<")
        await this.collection().updateOne(
            { slug },
            { $set: editedProduct }
        );

        return { message: "Product updated successfully" };
    }

    static async deleteProduct(slug: string, userId: string) {
        console.log(`Deleting product with slug: ${slug} and userId: ${userId}`);
        const existingProduct = await this.collection().findOne({ slug });
        if (!existingProduct) {
            throw new Error("Product not found");
        }
        if (existingProduct.sellerId !== userId) {
            throw new Error("User not authorized to delete this product");
        }

        const deleteResult = await this.collection().deleteOne({ slug, sellerId: userId });
        console.log(`Delete result: ${JSON.stringify(deleteResult)}`);
        return { message: "Product deleted successfully" };
    }
}