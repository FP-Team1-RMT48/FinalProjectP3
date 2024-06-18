import {
  EditedProduct,
  NewProduct,
  Pagination,
  Product,
} from "@/app/interface";
import { getCollection } from "../config";
import { z } from "zod";
import { ObjectId } from "mongodb";

const NewProductSchema = z.object({
  sellerId: z
    .string({ message: "Seller ID is required" })
    .min(1, { message: "Seller ID is required" }),
  name: z
    .string({ message: "Product name is required" })
    .min(1, { message: "Product name is required" }),
  slug: z
    .string({ message: "Product slug is required" })
    .min(1, { message: "Product slug is required" }),
  image: z
    .string({ message: "Product image is required" })
    .min(1, { message: "Product image is required" }),
  description: z
    .string({ message: "Product description is required" })
    .min(1, { message: "Product description is required" }),
  excerpt: z.string().optional(),
  type: z
    .string({ message: "Product type is required" })
    .min(1, { message: "Product type is required" }),
  category: z
    .string({ message: "Product category is required" })
    .min(1, { message: "Product category is required" }),
  status: z.string().default("VERIFYING"),
  price: z
    .number({ message: "Price must be a positive number" })
    .min(1, { message: "Price must be a positive number" }),
  eventId: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Event ID cannot be null or undefined",
  }),
});

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default class Products {
  static collection() {
    return getCollection("Products");
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
        $lookup: {
          from: "Events",
          localField: "eventId",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
    ];

    const totalData = await this.collection()
      .aggregate(aggregateTotalData)
      .toArray();
    const products = (await this.collection()
      .aggregate(aggregate)
      .toArray()) as Product[];

    let currentPage = page + 1;
    let totalPage = Math.ceil(totalData[0].count / dataPage);
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
    const agg = [
      {
        $match: {
          slug: slug,
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "sellerId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const product = await this.collection().aggregate(agg).toArray();
    return product;
  }

  static async addProduct(newProduct: NewProduct) {
    let addedProduct = {
      ...newProduct,
      slug: createSlug(newProduct.name),
    };

    const parseResult = NewProductSchema.safeParse(addedProduct);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const isProductSlugExist = await this.collection().findOne({
      slug: addedProduct.slug,
    });
    if (isProductSlugExist) {
      throw new Error("product name already exist");
    }

    await this.collection().insertOne({
      ...addedProduct,
      sellerId: new ObjectId(addedProduct.sellerId),
    });

    return { message: "Success add new Product" };
  }

  static async getProductByName(searchKey: string) {
    const products = (await this.collection()
      .find({ name: { $regex: searchKey, $option: "i" } })
      .toArray()) as Product[];

    return products;
  }

  static async getProductPreview() {
    const aggregate = [
      {
        $limit: 5,
      },
    ];
    const products = (await this.collection()
      .aggregate(aggregate)
      .toArray()) as Product[];
    return products;
  }

  static async editProduct(
    slug: string,
    updatedProductBody: EditedProduct,
    userId: string
  ) {
    const existingProduct = await this.collection().findOne({ slug });
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    if (existingProduct.sellerId.toString() !== userId) {
      throw new Error("User not authorized to edit this product");
    }
    const editedProduct = {
      ...existingProduct,
      name: updatedProductBody.name,
      image: updatedProductBody.image,
      description: updatedProductBody.description,
      excerpt: updatedProductBody.excerpt,
      type: updatedProductBody.type,
      category: updatedProductBody.category,
      status: updatedProductBody.status,
      price: updatedProductBody.price,
      slug: createSlug(updatedProductBody.name),
    };
    NewProductSchema.partial().parse({ editedProduct });
    await this.collection().updateOne({ slug }, { $set: editedProduct });

    return { message: "Product updated successfully" };
  }

  static async editByAdminProduct(
    slug: string,
    updatedProductBody: EditedProduct
  ) {
    const existingProduct = await this.collection().findOne({ slug });
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    const editedProduct = {
      ...existingProduct,
      name: updatedProductBody.name,
      image: updatedProductBody.image,
      description: updatedProductBody.description,
      excerpt: updatedProductBody.excerpt,
      type: updatedProductBody.type,
      category: updatedProductBody.category,
      status: updatedProductBody.status,
      price: updatedProductBody.price,
      slug: createSlug(updatedProductBody.name),
    };
    NewProductSchema.partial().parse({ editedProduct });
    await this.collection().updateOne({ slug }, { $set: editedProduct });

    return { message: "Product updated successfully" };
  }

  static async deleteProduct(slug: string, userId: string) {
    console.log(`Deleting product with slug: ${slug} and userId: ${userId}`);
    const existingProduct = await this.collection().findOne({ slug });
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    if (existingProduct.sellerId.toString() !== userId) {
      throw new Error("User not authorized to delete this product");
    }

    const deleteResult = await this.collection().deleteOne({
      slug,
      sellerId: new ObjectId(userId),
    });
    console.log(`Delete result: ${JSON.stringify(deleteResult)}`);
    return { message: "Product deleted successfully" };
  }

  static async getProductBySellerId(sellerId: string) {
    const allowedStatuses = ["AVAILABLE", "VERIFYING", "UNAVAILABLE"];
    const agg = [
      {
        $match: {
          sellerId: new ObjectId(sellerId),
          status: {
            $in: allowedStatuses,
          },
        },
      },
      {
        $lookup: {
          from: "Events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: {
          path: "$event",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const products = await this.collection().aggregate(agg).toArray();
    return products;
  }
}
